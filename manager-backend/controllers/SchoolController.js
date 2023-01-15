// School endpoints controller

const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const SchoolObject = require('../dataObjects/SchoolObject');
const ClassroomObject = require('../dataObjects/ClassroomObject');
const db = require('../utils/db');

// Class with methods to control user related endpoints
class SchoolController {
  // Method to create a school
  async createSchool(request, response) {
    // Getting request data and declaring relavant variables
    const { name } = request.body;
    const { address } = request.body;
    const { level } = request.body;
    const { classrooms } = request.body;
    const { password } = request.body;
    const user = request.user;

    // Validating the data
    if (!name) return response.status(400).send({ error: 'Please provide a name for the school.' });
    if (!address) return response.status(400).send({ error: 'Please provide an address for the school.' });
    if (!level) return response.status(400).send({ error: 'Please provide a level for the school (Primary/Secondary).' });
    if (!password) return response.status(400).send({ error: 'Please provide admin password.' });

    // When user is authorized to make request
    if (user.password === sha1(password)) {
      // Check if school name has been used
      const userSchools = await dbClient.get('schools', { name });
      if (userSchools.length > 0) {
        return response.status(409).send({ error: 'You already have a school registered under this name.' });
      }

      // Create a new school object and save in database
      const school = new SchoolObject(user._id, name, address, level, classrooms.length);
      const schId = await dbClient.post('schools', school);
      if (!schId.response) {
        return response.status(400).send({ error: 'Unable to create school please try again.' });
      }

      // Create classrooms for the school
      const unsaved = [];
      classrooms.forEach(async (classroom) => {
        const clsObject = new ClassroomObject(classroom, schId.response);
        const clsId = await dbClient.post('classrooms', clsObject);
        if (!clsId.response) {
          unsaved.append(classroom);
        }
      });

      // Check if any classroom failed to save
      if (unsaved.length > 0) {
        return response.send({ success: `School created!...${unsaved} failed to create. Please create manually.` });
      }

      // When school and classrooms are created successfully
      return response.send({ success: 'School created!' });
    }
    // When provided admin password doesn't match user password
    return response.status(403).send({ error: 'Wrong password!' });
  }

  // Method to get all schools for a user
  async getSchools(request, response) {
    // Getting request data and declaring relavant variables
    const user = request.user;
    const schools = await dbClient.get('schools', { ownerId: user._id });
    if (schools.length > 0) {
      response.send({ success: schools });
    } else {
      response.status(404).send({ error: 'No schools registered. Please register a school to continue.'});
    }
  }

  // Method to get Information for a school
  async getSchool(request, response) {
    // Getting request data and declaring relavant variables
    const url = request.url;
    //const data = url.split('/');
    //const schoolName = (data[data.length - 1]).replace(new RegExp('%20', 'g'), ' ').replace(new RegExp('_', 'g'), ' ');
    let { schoolName } = request.params;
    schoolName = schoolName.replace(new RegExp('_', 'g'), ' ');
    const school = await dbClient.get('schools', { name: schoolName });
    if (school.length > 0) {
      return response.send({ success: school[0]});
    } else {
      return response.status(404).send({ error: 'School doesn\'t exist. Please check url and retry' });
    }
  }

  // Method to edit student information
  async editSchool(request, response) {
    // Getting request data and declaring relavant variables
    let { schoolName } = request.params;
    const user = request.user;
    let info = request.body || {};
    info.updatedAt = new Date;
    schoolName = schoolName.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');
  
    // Get School form DB
    const school = await dbClient.get('schools', { name: schoolName });
    if (school) {
      // Check if the new School name has been used
      if (info.name) {
        const userSchools = await dbClient.get('schools', { 
          name: info.name,
        });
        if (userSchools) {
          return response.status(409).send({ error: 'You already have a School registered with this name.' });
        }
      }

      const saved = await dbClient.put('schools', { name: schoolName }, info);
      if (saved) {
        info.name ? schoolName = info.name : schoolName = schoolName;
        const updatedSchool = await dbClient.get('schools', { name: schoolName });

        return response.send({ success: updatedSchool[0]});
      }
    } else {
      return response.status(404).send({ error: 'School doesn\'t exist. Please check name and retry' });
    }
  }
}

// Exporting class instance
module.exports = new SchoolController();
