const express = require('express');

const patientRouter = express.Router();

const { auth } = require('../AuthorizationMiddleWare/authMiddleware');

// middlewares
const {
  patientSignUpMiddleWare, patientSignUpValidations,
  patientSignInMiddleWare, patientSignInValidations,
  scheduleAppointmentMiddleware,
  deleteAppointmentMiddleware
} = require('./middleware')

// controllers
const {
  patientSignUp,
  patientSignIn,
  scheduleAppointment,
  deleteScheduleAppointment
} = require('./controllers');

// API routes
patientRouter.post('/addPatient', patientSignUpValidations(), patientSignUpMiddleWare, patientSignUp);
patientRouter.get('/signInPatient', patientSignInValidations(), patientSignInMiddleWare, patientSignIn);
patientRouter.post('/scheduleAppointment', auth, scheduleAppointmentMiddleware, scheduleAppointment);
patientRouter.delete('/deleteAppointment', auth, deleteAppointmentMiddleware, deleteScheduleAppointment);

module.exports = patientRouter;