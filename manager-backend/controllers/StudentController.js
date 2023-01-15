// Student endpoints controller

const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const StudentObject = require('../dataObjects/StudentObject');
const db = require('../utils/db');

// Class with methods to control user related endpoints
class StudentController {
  // Method to create a Student
  async createStudent(request, response) {
    // Getting request data and declaring relavant variables
    const { firstname } = request.body;
    const { lastname } = request.body;
    const { age } = request.body;
    const { sex } = request.body;
    const { phoneNo } = request.body;
    const { discount } = request.body || 0;
    const { classroom } = request.body;
    const { password } = request.body;
    const { schoolName } = request.body;
    const fullname = `${lastname} ${firstname}`;
    const user = request.user;

    // Validating the data
    if (!firstname) return response.status(400).send({ error: 'Please provide a firstname' });
    if (!lastname) return response.status(400).send({ error: 'Please provide a lastname' });
    if (!age) return response.status(400).send({ error: 'Please provide age for the Student' });
    if (!sex) return response.status(400).send({ error: 'Please provide sex for the Student' });
    if (!phoneNo) return response.status(400).send({ error: 'Please provide phone number for the Student' });
    if (!classroom) return response.status(400).send({ error: 'Please provide classroom for the Student' });
    if (!schoolName) return response.status(400).send({ error: 'Please provide school name to register student in' });
    if (!password) return response.status(400).send({ error: 'Please provide admin password.' });
    if (sex !== 'Male' && sex !== 'Female') return response.status(400).send({ error: 'sex has to be "Male" or "Female"' });

    // When user is authorized to make request
    if (user.password === sha1(password)) {
      // Get school Id for the schoolname
      const schData = await dbClient.get('schools', { name: schoolName });
      if (!schData) {
        return response.status(404).send({ error: 'No school found with provided name.' });
      }
      const schoolId = (schData[0])._id;

      // Check if Student name has been used
      const userStudents = await dbClient.get('students', { schoolId, classroom, fullname });
      if (userStudents) {
        return response.status(409).send({ error: 'You already have a Student registered with this name in this class.\n Please add a middlename separated by a space to differentiate this student.' });
      }

      // Create a new Student object and save in database
      const student = new StudentObject(fullname, age, sex, phoneNo, discount, classroom, schoolId);
      const stuId = await dbClient.post('students', student);
      if (!stuId.response) {
        return response.status(400).send({ error: 'Unable to create Student please try again.' });
      }

      // When Student and Students are created successfully

      // Add the object to the redis database
      let objects = await redisClient.get(`objects.${user._id}.${schoolId}`);
      if ((!objects) || (objects && Object.keys(objects).length === 0)) {
        objects = JSON.stringify({ name: fullname, path: `/students/${stuId.response}` });
      } else {
        objects = JSON.parse(objects);
        objects[stuId.response] = {
          name: `${lastname} ${firstname}  (${classroom})`,
          path: `/students/${stuId.response}`,
        }
        objects = JSON.stringify(objects)
      }
      redisClient.set(`objects.${user._id}.${schoolId}`, objects);

      // Return success code
      return response.send({ success: 'Student created!' });
    }
    // When provided admin password doesn't match user password
    return response.status(403).send({ error: 'Wrong password!' });
  }

  // Method to get all Students for a user
  async getStudents(request, response) {
    // Getting request data and declaring relavant variables
    const user = request.user;
    let { schoolName } = request.query;
    let { classroom } = request.query;
    schoolName = schoolName.replace(new RegExp('%20', 'g'), ' ');

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    let students;
    if (classroom) {
      students = await dbClient.get('students', { schoolId, classroom });
    } else {
      students = await dbClient.get('students', { schoolId });
    }
    if (students) {
      return response.send({ success: students });
    } else {
      if (classroom) {
        return response.status(404).send({ error: 'No Students in this classroom.'});
      }
      return response.status(404).send({ error: 'No Students registered. Please register a Student to continue.'});
    }
  }

  // Method to get Information for a Student
  async getStudent(request, response) {
    // Getting request data and declaring relavant variables
    const { studentId } = request.params;
    let { schoolName } = request.query;
    schoolName = schoolName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    // Get Student form DB
    if (!studentId || studentId.length < 24) return response.status(400).send({ error: 'Student doesn\'t exist. Please check ID and retry.'})
    const student = await dbClient.get('students', { _id: ObjectId(studentId), schoolId });
    if (student) {
      return response.send({ success: student[0]});
    } else {
      return response.status(404).send({ error: 'Student doesn\'t exist. Please check ID and retry' });
    }
  }

  // Method to edit student information
  async editStudent(request, response) {
    // Getting request data and declaring relavant variables
    const { studentId } = request.params;
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

    // Get Student form DB
    const student = await dbClient.get('students', { _id: ObjectId(studentId), schoolId });
    if (student) {

      // Check if Student name has been used
      if (info.fullname) {
        const userStudents = await dbClient.get('students', { 
          schoolId,
          classroom: student[0].classroom,
          fullname: info.fullname,
        });
        if (userStudents) {
          return response.status(409).send({ error: 'You already have a Student registered with this name in this class.' });
        }
      }

      const saved = await dbClient.put('students', { _id: ObjectId(studentId) }, info);
      if (saved) {
        const updatedStudent = await dbClient.get('students', { _id: ObjectId(studentId) });

        // Edit student in redis database
        let objects = await redisClient.get(`objects.${user._id}.${schoolId}`);
        objects = JSON.parse(objects);
        delete objects[student[0]._id];
        objects[student[0]._id] = {
          name: `${updatedStudent[0].fullname}  (${updatedStudent[0].classroom})`,
          path: `/students/${studentId}`,
        }

        objects = JSON.stringify(objects)
        redisClient.set(`objects.${user._id}.${schoolId}`, objects);

        return response.send({ success: updatedStudent[0]});
      }
    } else {
      return response.status(404).send({ error: 'Student doesn\'t exist. Please check ID and retry' });
    }
  }

  async deleteStudent(request, response) {
    // Getting request data and declaring relavant variables
    const { studentId } = request.params;
    let { schoolName } = request.query;
    const { password } = request.query;
    const user = request.user;
    schoolName = schoolName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');

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

    // Delete Student from DB
    const del = await dbClient.del('students', { _id: ObjectId(studentId) });

    if (!del === 410) return response.status(410).send({ error: 'The student doesn\'t exist or has already been deleted.' });

    // Delete student object from the redis database
    let objects = await redisClient.get(`objects.${user._id}.${schoolId}`);
    if ((!objects) || (objects && Object.keys(objects).length === 0)) {
      objects = JSON.stringify({});
    } else {
      objects = JSON.parse(objects);
      delete objects[studentId];
      objects = JSON.stringify(objects)
    }
    redisClient.set(`objects.${user._id}.${schoolId}`, objects);

    return response.send({ success: 'Student record has been deleted' });
  }
}

// Exporting class instance
module.exports = new StudentController();
