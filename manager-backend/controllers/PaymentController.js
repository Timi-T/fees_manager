// Payment endpoints controller

const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const PaymentObject = require('../dataObjects/PaymentObject');
const db = require('../utils/db');

// Class with methods to control user related endpoints
class PaymentController {
  // Method to save a payment a Payment
  async createPayment(request, response) {
    // Getting request data and declaring relavant variables

    const { depositorName } = request.body;
    const { email } = request.body;
    const { studentName } = request.body;
    const { studentId } = request.body;
    const { studentClass } = request.body;
    const { amount } = request.body;
    const { purpose } = request.body;
    const { schoolName } = request.body;
    const { refNo } = request.body;
    const { status } = request.body;
    const { message } = request.body;
    const { transactionNo } = request.body;
    const user = request.user;

    // Validating the request source (To make sure it is made from the frontend and not terminal)

    // When user is authorized to make request
    if (user) {
      // Get school Id for the schoolname
      const schData = await dbClient.get('schools', { name: schoolName });
      if (!schData) {
        return response.status(404).send({ error: 'No school found with provided name.' });
      }
      const schoolId = (schData[0])._id;

      // Add payment to student account
      // Add payment to classroom account
      // Add payment to school account

      // Create a new Payment object and save in database
      const payment = new PaymentObject(
        depositorName,
        email,
        studentName,
        studentId,
        studentClass,
        amount,
        purpose,
        schoolId,
        refNo,
        status,
        message,
        transactionNo,
      );
      const payId = await dbClient.post('payments', payment);
      /*if (!clsId.response) {
        return response.status(400).send({ error: 'Unable to create Payment please try again.' });
      }*/

      // When Payment and Payments are created successfully
      return response.send({ success: 'Payment saved!' });
    }
    // When request isn't from the frontend
    return response.status(403).send({ error: 'Please use a browser client to make this request!' });
  }

  // Method to get all Payments for a user
  async getPayments(request, response) {
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

    let payments;
    if (classroom) {
      classroom = classroom.replace(new RegExp('%20', 'g'), ' ');
      payments = await dbClient.get('payments', { schoolId, studentClass: classroom });
    } else {
      payments = await dbClient.get('payments', { schoolId });
    }
    if (payments) {
      response.send({ success: payments });
    } else {
      if (classroom) {
        return response.status(404).send({ error: 'No Payments records for students in this class!'});
      } else {
        return response.status(404).send({ error: 'No Payments records!'});
      }
    }
  }

  // Method to get Information for a Payment
  async getPayment(request, response) {
    // Getting request data and declaring relavant variables
    const url = request.url;
    const data = url.split('/');
    let { paymentId } = request.params;
    const { schoolName } = request.query;

    // Get the school Id from provided name
    const schData = await dbClient.get('schools', { name: schoolName });
    if (!schData) {
      return response.status(404).send({ error: 'No school found with provided name.' });
    }
    const schoolId = (schData[0])._id;

    // Get Payment form DB
    const payment = await dbClient.get('payments', { _id: ObjectId(paymentId), schoolId });
    if (payment) {
      return response.send({ success: payment[0]});
    } else {
      return response.status(404).send({ error: 'Payment doesn\'t exist. Please check url and retry' });
    }
  }
}

// Exporting class instance
module.exports = new PaymentController();
