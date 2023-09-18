// aquiring Doctor Model
const { models: { Doctor, Availability, LabTest } } = require('../../models/db-connection');

// aquiring bcrypt for password security
const bcrypt = require('bcrypt');

// aquiring jsonwebtoken module
const jwt = require('jsonwebtoken');

/**
 * Adding Doctor's details to DataBase
 * Doctor SignUp Controller
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
      const token = jwt.sign({id:  docObject.Doctor_ID, Email: docObject.Email, isDoctor: docObject.isDoctor}, process.env.JWTKEY);
      console.log(token)
      return res.status(200).header('x-auth-token', token).send('OK.');
    }else{
      return res.status(402).send('User Already Exists.');
    } 
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

/**
 * Authenticating Doctor's details from DataBase and Signing In
 * @param {*} req 
 * @param {*} res 
 * @returns 
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
      const token = jwt.sign({id:  doctor.Doctor_ID, isDoctor: doctor.isDoctor}, process.env.JWTKEY);
      return res.status(200).header('x-auth-token').send('OK');
    }else{
      return res.status(400).send('invalid Credentials');
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

/**
 * setting weather a doc is available at a time slot
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const setAvailabilitySlots = async (req, res) => {
  const {
    Day,
    TimeFrom,
    TimeTo,
    Doctor_ID
  } = req.body;
  console.log('availability controller here.');
  try {
    await Availability.create({
      Day: Day,
      TimeFrom: TimeFrom,
      TimeTo: TimeTo,
      Doctor_ID: 7
    });
    return res.status(200).send('Slot Added Successfuly.');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

/**
 * Doc Writes Tests for patients
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const WriteTest = async (req, res) => {
  try {
    await LabTest.create({
      TestName: req.body.TestName,
      TestTime: req.body.TestTime,
      Priority: req.body.Priority,
      ExpectedResultTime: req.body.ExpectedResultTime,
      TestPrice: req.body.TestPrice,
      Patient_ID: req.body.Patient_ID,
      Doctor_ID: req.body.Doctor_ID
    })
    return res.status(200).send('OK');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deleteAvailabilitySlots = async (req, res) => {
  try {
    await Availability.destroy({
      where: {
        availabilitySlot_ID: req.body.availabilitySlot_ID
      }
    })
    return res.status(200).send('Ok');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// exporting controllers
module.exports ={
  addDoctor,
  doctorSignIn,
  setAvailabilitySlots,
  deleteAvailabilitySlots,
  WriteTest
}