// aquiring Doctor Model
const { models: { Doctor, Availability } } = require('../../models/db-connection');

// aquiring bcrypt for password security
const bcrypt = require('bcrypt');

// aquiring jsonwebtoken module
const jwt = require('jsonwebtoken');

/**
 * Adding Doctor's details to DataBase
 * @param : req
 * @param : res
 */
const addDoctor = async (req, res) => {
  try {
    const doc =await Doctor.findOne({
      where: {
        Email: req.body.Email
      }
    });
    if(!doc){
      const docObject = await Doctor.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ContactNumber: req.body.ContactNumber,
        Email: req.body.Email,
        Speciality: req.body.Speciality,
        Qualifications: req.body.Qualifications,
        ConsultationFee: parseInt(req.body.ConsultationFee),
        Experience: req.body.Experience,
        Username: req.body.Username,
        Password: await bcrypt.hash(req.body.Password, 10)
      });
      return res.status(200).send('Sign Up Successful.')
    }else{
      return res.status(402).send('User Already Exists.');
    } 
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

/**
 * Authenticating Doctor's details from DataBase
 * @param : req
 * @param : res
 */
const doctorSignIn = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: {
        Email : req.body.Email
      }
    })
    const flag = await bcrypt.compare(req.body.Password, doctor.Password)
    if(doctor && flag){
      return res.status(200).send('SignIn Successful.');
    }else{
      return res.status(400).send('invalid Credentials');
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

const setAvailabilitySlots = async (req, res) => {
  const {
    Day,
    TimeFrom,
    TimeTo,
    Doctor_ID
  } = req.body;
  try {
    await Availability.create({
      Day: Day,
      TimeFrom: TimeFrom,
      TimeTo: TimeTo,
      Doctor_ID: Doctor_ID
    });
    return res.status(200).send('Time Added Successfuly.')
  } catch (error) {
    return res.status(500).send('Internal Server Error.')
  }
}

module.exports ={
  addDoctor,
  doctorSignIn,
  setAvailabilitySlots
}