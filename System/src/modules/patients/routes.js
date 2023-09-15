const express = require('express');

const patientRouter = express.Router();

patientRouter.post('/addPatient');

module.exports = patientRouter;