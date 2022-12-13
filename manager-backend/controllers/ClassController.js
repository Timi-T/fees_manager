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
    classroomName = classroomName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');
    const { password } = request.body;
    const { schoolName } = request.body;
    const user = request.user;

    // Validating the data
    if (!classTeacher) return response.status(400).send({ error: 'Please provide a name for the Classroom Teacher.' });
    if (!fees) return response.status(400).send({ error: 'Please provide an fees for the Classroom.' });
    if (!classroomName) return response.status(400).send({ error: 'Please provide a name for the Classroom' });
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
      if (!objects) {
        objects = JSON.stringify([{ name: classroomName, path: `/classrooms/${classroomName}` }]);
      } else {
        objects = JSON.parse(objects);
        objects.push({ name: classroomName, path: `/classrooms/${classroomName}` });
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
}

// Exporting class instance
module.exports = new ClassroomController();
