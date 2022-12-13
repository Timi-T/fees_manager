/* eslint class-methods-use-this: "off" */

// User operations

const sha1 = require('sha1');
const request = require('request');
const util = require('util');
const UserObject = require('../dataObjects/UserObject');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

// Function to validate a form for user creation
function validateUserInfo(firstname, lastname, email, phone, password) {
  if (!firstname) return { error: 'Missing firstname' };
  if (!lastname) return { error: 'Missing lastname' };
  if (!email) return { error: 'Missing email' };
  if (!phone) return { error: 'Missing phone number' };
  if (!password) return { error: 'Missing password' };
  return false;
}

// Function to generate a random number
function generateRand(length) {
  const Id = [...Array(length)].map(() => {
    const num = String(Math.random() * 10)[0];
    return Number(num);
  }).join('');
  return Id;
}

// Function to send an email using Emailjs third party API
const sendEmail = async (email, firstname, verificationCode) => {
  // Required data for post request
  const postData = {
    method: 'POST',
    uri: 'https://api.emailjs.com/api/v1.0/email/send',
    body: JSON.stringify({
      service_id: 'service_l5wa1ga',
      template_id: 'template_ny9dfv4',
      user_id: 'lLW0q2IwA6XYEkIjS',
      accessToken: '1p483Hw738fyB8CeOkQsR',
      template_params: {
        from_name: 'admin@feesmanager',
        reciever_email: email,
        to_name: firstname,
        verification_code: verificationCode,
      }
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const send = util.promisify(request);
  const res = await send(postData);
  return [res.statusCode, res.body];
}

// User controller class that controls all endpoints for user operations
class UserController {
  // Function to create a user
  async createUser(request, response) {
    // Getting request data and declaring relavant variables
    const { firstname, lastname, email, phone, password } = request.body;
    const emailExists = await dbClient.get(
      'users',
      { email },
    );
    const phoneExists = await dbClient.get(
      'users',
      { phone },
    );

    // Checking if a user with the email exists already
    if (emailExists.length > 0) {
      return response.status(400).send({ error: 'This email is associated with an account already' });
    }

    // Checking if a user with the phone number exists already
    if (phoneExists.length > 0) {
      return response.status(400).send({ error: 'This phone number is associated with an account already' });
    }

    // Use a function to validate all provided data
    const validationError = validateUserInfo(firstname, lastname, email, phone, password);

    // When there is no validation error
    if (!validationError) {
      // Create a new user object using the template class
      const user = new UserObject(firstname, lastname, email, phone, password);

      // Generate a verification code and send to user email
      const verificationCode = generateRand(6);
      const emailSent = await sendEmail(email, firstname, verificationCode);

      // When the email fails to send
      console.log(emailSent)
      if (emailSent[0] !== 200) {
        if (emailSent[0] === 412) {
          // Invalid email
          return response.status(400).send({ error: 'Invalid email address' });
        }
        // Bad request
        return response.status(400).send({ error: 'An error occured. Please check the email and retry' });
      }

      // Create a record for the user in the database and cache verification code for 5 minutes
      const create = await dbClient.post('users', user);
      await redisClient.set(sha1(verificationCode), email, 60 * 5);

      // When there is an error creating user
      if (!create.response) return response.status(400).send({ 'error': 'An error occured while creating your account. Please try again' });
      // When user is created successfully
      if (create.response) return response.status(200).send({ 'success': `Account created for ${firstname}! Please login to continue.` });
    }

    // When a validation error occurs
    return response.status(400).send(validationError);
  }

  // Function to verify an email address
  async verifyEmail(request, response) {
    // Getting request data and declaring relavant variables
    const { code } = request.body;
    const shacode = sha1(code);
    const email = await redisClient.get(shacode);

    // If an email exists with the corresponding verification code
    if (email) {
      // Update the user account to be verified
      const res = await dbClient.put('users', { email }, { verifiedEmail : true });

      // When user is updated successfully
      if (res) {
        return response.status(200).send({ success: 'Verified'});
      }
      // When the user isn't updated yet
      return response.status(400).send({ error: 'Failed to update your account. Please try again using the same code' });
    }

    // When a wrong code is provided
    return response.status(400).send({ error: 'Wrong code' });
  }

  // Function to resend email to the user
  async resendEmail(request, response) {
    // Getting request data and declaring relavant variables
    const  { email } = request.body;
    const verificationCode = generateRand(6);
    const user = await dbClient.get('users', { email });

    // When a user with provided email is found
    if (user.length <= 0) {
      return response.status(400).send({ error: 'Account doesnt exist' });
    }

    // Resending the verification email and cahing the value for 5 minutes
    const firstname = user[0].firstname;
    const sent = await sendEmail(email, firstname, verificationCode);
    await redisClient.set(sha1(verificationCode), email, 60 * 5);

    // When the email is sent successfully
    if (sent[0] === 200) {
      return response.status(200).send({ success: 'sent' });
    }

    // When email fails to send
    return response.status(400).send({ 'error': 'failed' });
  }

  async getUserObjects(request, response) {
    let { schoolName } = request.query;
    schoolName = schoolName.replace(new RegExp('%20', 'g'), ' ');
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;
    let userObjects = await redisClient.get(`objects.${request.user._id}.${schoolId}`);
    if (!userObjects) {
      userObjects = [];
    } else {
      userObjects = JSON.parse(userObjects);
    }
    response.send(
      { success: userObjects }
    )
  }
}

// Exporting an instance of the class
module.exports = new UserController();
