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
      if (!objects) {
        objects = JSON.stringify([{ name: fullname, path: `/students/${stuId.response}` }]);
      } else {
        objects = JSON.parse(objects);
        objects.push({ name: `${fullname}  (${classroom})`, path: `/students/${stuId.response}` });
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
    schoolName = schoolName.replace(new RegExp('%20', 'g'), ' ');

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    const students = await dbClient.get('students', { schoolId });
    if (students) {
      response.send({ success: students });
    } else {
      response.status(404).send({ error: 'No Students registered. Please register a Student to continue.'});
    }
  }

  // Method to get Information for a Student
  async getStudent(request, response) {
    // Getting request data and declaring relavant variables
    const url = request.url;
    const { studentId } = request.params;
    let { schoolName } = request.query;
    schoolName = schoolName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ')

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    // Get Student form DB
    const student = await dbClient.get('students', { _id: ObjectId(studentId), schoolId });
    if (student) {
      return response.send({ success: student[0]});
    } else {
      return response.status(404).send({ error: 'Student doesn\'t exist. Please check ID and retry' });
    }
  }
}

// Exporting class instance
module.exports = new StudentController();
