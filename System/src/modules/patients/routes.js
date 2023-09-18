const express = require('express');

const patientRouter = express.Router();

const {
  patientSignUpMiddleWare,
  patientSignInMiddleWare,
  scheduleAppointmentMiddleware,
  deleteAppointmentMiddleware
} = require('./middleware')

const {
  patientSignUp,
  patientSignIn,
  scheduleAppointment,
  deleteScheduleAppointment
} = require('./controllers');

patientRouter.post('/addPatient',patientSignUpMiddleWare, patientSignUp);
patientRouter.get('/signInPatient', patientSignInMiddleWare, patientSignIn);
patientRouter.post('/scheduleAppointment', scheduleAppointmentMiddleware, scheduleAppointment);
patientRouter.delete('/deleteAppointment', deleteAppointmentMiddleware, deleteScheduleAppointment);

module.exports = patientRouter;