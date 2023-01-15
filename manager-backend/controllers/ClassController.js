// Classroom endpoints controller

const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const ClassroomObject = require('../dataObjects/ClassroomObject');
const db = require('../utils/db');

// Class with methods to control user related endpoints
class ClassroomController {
  // Method to create a Classroom
  async createClassroom(request, response) {
    // Getting request data and declaring relavant variables
    const { classTeacher } = request.body;
    const { fees } = request.body;
    let { classroomName } = request.body;
    if (!classroomName) return response.status(400).send({ error: 'Please provide a name for the Classroom' });
    classroomName = classroomName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');
    const { password } = request.body;
    const { schoolName } = request.body;
    const user = request.user;

    // Validating the data
    if (!classTeacher) return response.status(400).send({ error: 'Please provide a name for the Classroom Teacher.' });
    if (!fees) return response.status(400).send({ error: 'Please provide an fees for the Classroom.' });
    if (!password) return response.status(400).send({ error: 'Please provide admin password.' });

    // When user is authorized to make request
    if (user.password === sha1(password)) {
      // Get school Id for the schoolname
      const schData = await dbClient.get('schools', { name: schoolName });
      if (!schData) {
        return response.status(404).send({ error: 'No school found with provided name.' });
      }
      const schoolId = (schData[0])._id;

      // Check if Classroom name has been used
      const userClassrooms = await dbClient.get('classrooms', { schoolId, name: classroomName });
      if (userClassrooms.length > 0) {
        return response.status(409).send({ error: 'You already have a Classroom registered with this name.' });
      }

      // Create a new Classroom object and save in database
      const classroom = new ClassroomObject(classroomName, schoolId, classTeacher, fees);
      const clsId = await dbClient.post('classrooms', classroom);
      if (!clsId.response) {
        return response.status(400).send({ error: 'Unable to create Classroom please try again.' });
      }

      // When Classroom and classrooms are created successfully
      
      // Add the object to the redis database
      let objects = await redisClient.get(`objects.${user._id}.${schoolId}`);
      const updatedClassroom = await dbClient.get('classrooms', { name: classroomName });
      if ((!objects) || (objects && Object.keys(objects).length === 0)) {
        objects = JSON.stringify({ name: classroomName, path: `/classrooms/${classroomName}` });
      } else {
        objects = JSON.parse(objects);
        objects[updatedClassroom[0]._id] = {
          name: `${updatedClassroom[0].name}`,
          path: `/classrooms/${classroomName}`,
        }

        objects = JSON.stringify(objects)
      }
      redisClient.set(`objects.${user._id}.${schoolId}`, objects);

      // Return success code
      return response.send({ success: 'Classroom created!' });
    }
    // When provided admin password doesn't match user password
    return response.status(403).send({ error: 'Wrong password!' });
  }

  // Method to get all Classrooms for a user
  async getClassrooms(request, response) {
    // Getting request data and declaring relavant variables
    const user = request.user;
    let { schoolName } = request.query;
    schoolName = schoolName.replace(new RegExp('%20', 'g'), ' ');

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    const Classrooms = await dbClient.get('classrooms', { schoolId });
    if (Classrooms) {
      response.send({ success: Classrooms });
    } else {
      response.status(404).send({ error: 'No Classrooms registered. Please register a Classroom to continue.'});
    }
  }

  // Method to get Information for a Classroom
  async getClassroom(request, response) {
    // Getting request data and declaring relavant variables
    const url = request.url;
    const data = url.split('/');
    let { classroomName } = request.params;
    classroomName = classroomName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');
    const { schoolName } = request.query;

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    // Get classroom form DB
    const Classroom = await dbClient.get('classrooms', { name: classroomName, schoolId });
    if (Classroom.length > 0) {
      return response.send({ success: Classroom[0]});
    } else {
      return response.status(404).send({ error: 'Classroom doesn\'t exist. Please check url and retry' });
    }
  }

  // Method to edit classroom information
  async editClassroom(request, response) {
    // Getting request data and declaring relavant variables
    let { className } = request.params;
    className = className.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');
    const user = request.user;
    let info = request.body || {};
    info.updatedAt = new Date;
    let { schoolName } = request.query;
    schoolName = schoolName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    // Get Classroom from DB
    const classroom = await dbClient.get('classrooms', { name: className, schoolId });
    if (classroom) {

      // Check if Student name has been used
      if (info.name) {
        const userClassrooms = await dbClient.get('classrooms', { 
          schoolId,
          name: info.name,
        });
        if (userClassrooms) {
          return response.status(409).send({ error: 'You already have a Classroom registered with this name.' });
        }
      }

      const saved = await dbClient.put('classrooms', { name: className }, info);
      if (saved) {
        info.name ? className = info.name : className = className;
        const updatedClassroom = await dbClient.get('classrooms', { name: className });

        // Edit classroom in redis database
        let objects = await redisClient.get(`objects.${user._id}.${schoolId}`);
        objects = JSON.parse(objects);
        delete objects[classroom[0]._id];
        objects[classroom[0]._id] = {
          name: `${updatedClassroom[0].name}`,
          path: `/classrooms/${className}`,
        }

        objects = JSON.stringify(objects)
        redisClient.set(`objects.${user._id}.${schoolId}`, objects);

        return response.send({ success: updatedClassroom[0]});
      }
    } else {
      return response.status(404).send({ error: 'Classroom doesn\'t exist. Please check name and retry' });
    }
  }

  async deleteClassroom(request, response) {
    // Getting request data and declaring relavant variables
    let { schoolName } = request.query;
    const { password } = request.query;
    let { className } = request.params;
    const user = request.user;
    schoolName = schoolName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');
    className = className.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');

    // Check that this user is authenticated for this request
    if (password != user.password) {
      return response.status(403).send({ error: 'Wrong password!' });
    }

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    // Get classroom from the database to get ID
    const cls = await dbClient.get('classrooms', { name: className });
    // Get students from the database to get all thier student id's
    const students = await dbClient.get('students', { classroom: className });

    // Delete classroom from database
    const delCls = await dbClient.del('classrooms', { name: className });
    if (!delCls === 410) return response.status(410).send({ error: 'The Classroom doesn\'t esist or has already been deleted.' });

    // Delete Students in the class from DB
    const delstu = await dbClient.delMany('students', { classroom: className });

    // Delete classroom and it's students from the redis database
    let objects = await redisClient.get(`objects.${user._id}.${schoolId}`);
    if ((!objects) || (objects && Object.keys(objects).length === 0)) {
      objects = JSON.stringify({});
    } else {
      objects = JSON.parse(objects);
      if (students) {
        students.forEach(stu => {
          delete objects[stu._id];
        });
      }
      delete objects[cls[0]._id];
      objects = JSON.stringify(objects);
    }

    redisClient.set(`objects.${user._id}.${schoolId}`, objects);

    return response.send({ success: 'Classroom record has been deleted' });
  }
}

// Exporting class instance
module.exports = new ClassroomController();
