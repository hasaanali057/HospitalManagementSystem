const express = require('express');

const patientRouter = express.Router();

const { auth } = require('../AuthorizationMiddleWare/authMiddleware');

// middlewares
const {
  patientSignUpMiddleWare,
  patientSignInMiddleWare,
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
patientRouter.post('/addPatient',patientSignUpMiddleWare, patientSignUp);
patientRouter.get('/signInPatient', patientSignInMiddleWare, patientSignIn);
patientRouter.post('/scheduleAppointment', auth, scheduleAppointmentMiddleware, scheduleAppointment);
patientRouter.delete('/deleteAppointment', auth, deleteAppointmentMiddleware, deleteScheduleAppointment);

module.exports = patientRouter;