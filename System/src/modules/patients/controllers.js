const jwt = require('jsonwebtoken');
const { models: { Patient, Appointment, Availability } } = require('../../models/db-connection');
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
      
      const token = jwt.sign({ 
        id:  patient.Patient_ID, 
        isPatient: patient.isPatient 
      }, process.env.JWTKEY);

      return res.status(200).header('x-auth-token', token).send('SignUp Successful: '+ token);
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
        const token = jwt.sign({
          id:  patient.Patient_ID, 
          isPatient: patient.isPatient 
        }, process.env.JWTKEY);
        return res.status(200).header('x-auth-token', token).send('SignIn Successful.'+ token);
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

/**
 * Patient schedules appointment
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const scheduleAppointment = async (req, res) => {
  try {
    const availableSlot = await Availability.findOne({
      where: {
        Doctor_ID: req.body.Doctor_ID,
        Day: req.body.Day,
        TimeFrom: req.body.TimeFrom,
        TimeTo: req.body.TimeTo
      }
    });
    console.log(availableSlot);
    if(availableSlot){

      const appointment = await Appointment.findOne({
        where: {
          Doctor_ID: req.body.Doctor_ID,
          Day: req.body.Day,
          Patient_ID: req.user.id
        }
      })
      if(!appointment){
        await Appointment.create({
          Doctor_ID: req.body.Doctor_ID,
          Patient_ID: req.user.id,
          Day: availableSlot.Day,
          Time: `${availableSlot.TimeFrom}-${availableSlot.TimeTo}`
        })
        return res.status(200).send('Appointment Scheduled Successfully.');
      }else{
        return res.status(403).send('Appointment Already Scheduled');
      }
    }else{
      return res.status(404).send('Slot Not Available.')
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deleteScheduleAppointment = async (req, res) => {
  try {
    await Appointment.destroy({
      where: {
        Appointment_ID: req.body.Appointment_ID,
        Patient_ID: req.user.id
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