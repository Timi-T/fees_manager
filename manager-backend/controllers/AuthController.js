// Authentication for requests

import { Buffer } from 'buffer';
const uuid = require('uuid');
const dbClient = require('../utils/db');
const sha1 = require('sha1');
const redisClient = require('../utils/redis');
const { ObjectId } = require('mongodb');

class AuthController {
  // Function to login a user
  async login(request, response) {
    // Getting request data and declaring relavant variables
    const { auth } = request.headers;
    const b64 = Buffer.from(auth, 'base64').toString('binary');
    const credentials = b64.split(':')
    const email = credentials[0];
    const password = credentials[1];

    // Get user with provided email
    const user = await dbClient.get('users', { email });

    // When user exists
    if (user.length > 0) {
      // Check if email of user is verified
      if (!user[0].verifiedEmail) {
        return response.status(400).send({ 'error': 'Account not verified. Please verify your email to continue' });
      }

      // Compare provided password with actual user password
      const pwd = sha1(password);
      if (pwd === user[0].password) {
        // setup redis and cache a session id the add it to the response cookies
        const authCookie = String(uuid.v4());
        const setCookie = await redisClient.set(`auth_${authCookie}`, String(user[0]._id), 60 * 60 * 24);
        response.cookie('auth_key', authCookie, { maxAge: 86400 * 1000 });
        return response.status(200).send({ 'success': 'User logged in' });
      }
      
      // When passwords don't match
      return response.status(400).send({ 'error': 'Invalid login credentials. Please check the provided fields' });
    }

    // When user doesn't exist
    return response.status(404).send({ 'error': 'Invalid login credentials. Please check the provided fields' });
  }

  // Function to get user for a session
  async authUser(request, response) {
    // Getting request data and declaring relavant variables
    const authCookie = request.cookies.auth_key;
    const userID = await redisClient.get(`auth_${authCookie}`);

    // Get user from database
    const userArray = await dbClient.get('users', { _id: ObjectId(userID) });

    // Sending the user info
    if (userArray.length > 0) {
      const user = userArray[0];
      return response.status(200).send({ _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone });
    }

    // When a wrong authentication cookie is recieved
    response.status(400).send('Invalid auth key');
  }

  // Function to ternimate a user session
  async logout(request, response) {
    // Getting request data and declaring relavant variables
    const authCookie = request.cookies.auth_key;

    // Deleting session cookie
    const deleted = await redisClient.del(`auth_${authCookie}`);

    // Upon successful deletion
    if (deleted) {
      return response.status(200).send({ 'success': 'User logged out' });
    }

    // When provided session id fails to delete
    return response.status(400).send({ 'error': 'Unable to logout user' });
  }

  // Function to verify a user to make a request
  async verifyLogin(req, res, next) {
    // Get the authorization header for the request
    const authCookie = req.cookies.auth_key;

    // When no token is provided
    if (!authCookie) return res.status(401).send({ error: 'Please login to access this endpoint' });

    // Verify provided token
    const userId = await redisClient.get(`auth_${authCookie}`);
    if (!userId) res.status(403).send({ error: 'Session expired or wrong token please login to get a new token.' });

    // Get user from database
    const userArray = await dbClient.get('users', { _id: ObjectId(userId) });

    // When user exists
    if (userArray.length > 0) {
      const user = userArray[0];

      // Set request user to current user
      req.user = user;

      // Continue from middleware to main function
      return next();
    } else {
      // When user doesn't exist
      return res.status(403).send({ error: 'User doesn\'t exist.' });
    }
  }
}

// Export instance of class
module.exports = new AuthController();
