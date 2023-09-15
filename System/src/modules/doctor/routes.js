const express = require('express');

const docRouter = express.Router();

const {
  addDoctorMiddleWare, docSignUpValidations,
  signInDoctorMiddleWare, docSignInValidations,
  setAvailabilitySlotsMiddleWare
} = require('./middleware');

const {
  addDoctor,
  doctorSignIn,
  setAvailabilitySlots
} =  require('./controllers');

docRouter.post('/docSignUp', docSignUpValidations(), addDoctorMiddleWare, addDoctor);
docRouter.get('/docSignIn', docSignInValidations(), signInDoctorMiddleWare, doctorSignIn);
docRouter.post('./setAvailabilitySlots', setAvailabilitySlotsMiddleWare, setAvailabilitySlots);

module.exports = docRouter;
