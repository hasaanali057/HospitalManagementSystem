const jwt = require('jsonwebtoken');
const { models: { Patient, Appointment } } = require('../../models/db-connection');
const bcrypt = require('bcrypt');

/**
 * SignUp Controller for Patient
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const patientSignUp = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        Email: req.body.Email
      }
    });
    if(patient) {
      return res.status(400).send('User Already exists with this email.');
    }else{
      const patient = await Patient.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ContactNumber: req.body.ContactNumber,
        Email: req.body.Email,
        Username: req.body.Username,
        Password: await bcrypt.hash(req.body.Password, 10)
      });
      const token = jwt.sign({id:  patient.Patient_ID, isPatient: patient.isPatient}, process.env.JWTKEY);
      console.log(token)
      return res.status(200).header('x-auth-token', token);
    }

  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}

/**
 * SignIn Controller for Patient
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const patientSignIn = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        Email: req.body.Email
      }
    });
    if(patient){
      const flag = await bcrypt.compare(req.body.Password, patient.Password);
      if(flag){
        return res.status(200).send('SignIn Successful.');
      }else{
        return res.status(401).send('Invalid Cradentials');
      }
    }else{
      return res.status(401).send('Invalid Cradentials');
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

const scheduleAppointment = async (req, res) => {
  try {
    const {
      Doctor_ID,
      Patient_ID,
      Day,
      TimeFrom,
      TimeTo
    } = req.body
    await Appointment.create({
      Doctor_ID: Doctor_ID,
      Patient_ID: Patient_ID,
      Day: Day,
      Time: `${TimeFrom}+${TimeTo}`
    })
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deleteScheduleAppointment = async (req, res) => {
  try {
    await Appointment.destroy({
      where: {
        Appointment_ID: req.body.Appointment_ID
      }
    })
    return res.status(200).send('Appointment deleted successfully.');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports ={
  patientSignUp,
  patientSignIn,
  scheduleAppointment,
  deleteScheduleAppointment
};