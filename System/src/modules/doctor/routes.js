const express = require('express');

const docRouter = express.Router();

const {
  addDoctorMiddleWare, docValidations
} = require('./middleware');

const {
  addDoctor
} =  require('./controllers');

docRouter.post('/addDoctor', docValidations(), addDoctorMiddleWare, addDoctor);

module.exports = {
  docRouter
};
