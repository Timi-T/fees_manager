//Define the routes for the application

const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const SchoolController = require('../controllers/SchoolController');
const ClassController = require('../controllers/ClassController');
const StudentController = require('../controllers/StudentController');
const PaymentController = require('../controllers/PaymentController');

// User routes
router.post('/api/v1/signup', UserController.createUser);
router.post('/api/v1/verify-email', UserController.verifyEmail);
router.post('/api/v1/resend-mail', UserController.resendEmail);
router.put('/api/v1/users/:userId/edit', AuthController.verifyLogin, UserController.editUser);
// Auth routes
router.post('/api/v1/login', AuthController.login);
router.get('/api/v1/auth', AuthController.authUser);
router.get('/api/v1/logout', AuthController.verifyLogin, AuthController.logout);
// School routes
router.post('/api/v1/create-school', AuthController.verifyLogin, SchoolController.createSchool);
router.get('/api/v1/schools', AuthController.verifyLogin, SchoolController.getSchools);
router.get('/api/v1/schools/:schoolName', AuthController.verifyLogin, SchoolController.getSchool);
router.put('/api/v1/schools/:schoolName/edit', AuthController.verifyLogin, SchoolController.editSchool);
// Classroom routes
router.post('/api/v1/create-classroom', AuthController.verifyLogin, ClassController.createClassroom);
router.get('/api/v1/classrooms', AuthController.verifyLogin, ClassController.getClassrooms);
router.get('/api/v1/classrooms/:classroomName', AuthController.verifyLogin, ClassController.getClassroom);
router.put('/api/v1/classrooms/:className/edit', AuthController.verifyLogin, ClassController.editClassroom);
router.delete('/api/v1/classrooms/:className/delete', AuthController.verifyLogin, ClassController.deleteClassroom);
// Student routes
router.post('/api/v1/register-student', AuthController.verifyLogin, StudentController.createStudent);
router.get('/api/v1/students', AuthController.verifyLogin, StudentController.getStudents);
router.get('/api/v1/students/:studentId', AuthController.verifyLogin, StudentController.getStudent);
router.put('/api/v1/students/:studentId/edit', AuthController.verifyLogin, StudentController.editStudent);
router.delete('/api/v1/students/:studentId/delete', AuthController.verifyLogin, StudentController.deleteStudent);
// Payment routes
router.post('/api/v1/save-payment', AuthController.verifyLogin, PaymentController.createPayment);
router.get('/api/v1/payments', AuthController.verifyLogin, PaymentController.getPayments);
router.get('/api/v1/payments/:paymentId', AuthController.verifyLogin, PaymentController.getPayment);
// Objects
router.get('/api/v1/objects', AuthController.verifyLogin, UserController.getUserObjects);
module.exports = router;
