const express = require('express');

const docRouter = express.Router();

// authorization middleWare
const { auth } = require('../AuthorizationMiddleWare/authMiddleware');

// acquiring middleware functions for doctor module
const {
  addDoctorMiddleWare, docSignUpValidations,
  signInDoctorMiddleWare, docSignInValidations,
  setAvailabilitySlotsMiddleWare,
  deleteAvailabilitySlotsMiddleWare,
  writeTestMiddleWare
} = require('./middleware');

// acquiring controller functions for doctor module.
const {
  addDoctor,
  doctorSignIn,
  setAvailabilitySlots,
  deleteAvailabilitySlots,
  WriteTest
} =  require('./controllers');

// Api routes
docRouter.post('/docSignUp', docSignUpValidations(), addDoctorMiddleWare, addDoctor);
docRouter.get('/docSignIn', docSignInValidations(), signInDoctorMiddleWare, doctorSignIn);
docRouter.post('/setAvailabilitySlots', auth,  setAvailabilitySlotsMiddleWare, setAvailabilitySlots);
docRouter.delete('/deleteAvailabilitySlots', auth,  deleteAvailabilitySlotsMiddleWare, deleteAvailabilitySlots);
docRouter.post('./writeTestForPatient', auth, writeTestMiddleWare, WriteTest)

module.exports = docRouter;
