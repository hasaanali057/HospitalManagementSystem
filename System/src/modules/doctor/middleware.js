
const jwt = require("jsonwebtoken");

const {
  check
} = require('express-validator');

const {
  validationFunction
} = require ('../../../config/common/validationHandler');

const docSignUpValidations = () => {
  return[
    check('FirstName').notEmpty().withMessage('First Name is required.')
      .isLength({min: 3}).withMessage('First Name should be atleast 3 characters long.'),
    check('LastName').notEmpty().withMessage('Last Name is required.')
      .isLength({ min: 3 }).withMessage('Last Name should be atleast 3 characters long.'),
    check('ContactNumber').notEmpty().withMessage('Contact Number is required.')
      .isNumeric().withMessage('Should contain numbers only.'),
    check('Email').notEmpty().withMessage('Email Required')
      .isEmail().withMessage('Invalid Email.'),
    check('Speciality').notEmpty().withMessage('Specialization is Required.'),
    check('Qualifications').notEmpty().withMessage('Enter Qualifications.'),
    check('ConsultationFee').notEmpty().withMessage('Enter Your Fee.')
      .isNumeric().withMessage('Fee Should be in Numbers.'),
    check('Experience').notEmpty().withMessage('Enter Your Experience.'),
    check('Username').notEmpty().withMessage('Username is required.')
      .isLength({ min: 4 }).withMessage('Username should be atleast 4 characters'),
    check('Password').notEmpty().withMessage('Password Required')
      .isLength({ min: 6 }).withMessage('Password should be 6 characters long atleast.')
  ]    
}

const addDoctorMiddleWare = async (req, res, next) => {
  let errormessages = [];

  const validationErrors = validationFunction(req, res);

  if(validationErrors?.length){
    validationErrors.map((error) => (errormessages.push(error.msg)));
    return res.status(400).json({errors: errormessages})
  }else{
    next();
  }
}

const docSignInValidations = () => {
  return[
    check('Email').notEmpty().withMessage('Email Required')
      .isEmail().withMessage('Invalid Email.'),
    check('Password').notEmpty().withMessage('Password Required')
      .isLength({ min: 6 }).withMessage('Password should be 6 characters long atleast.')
  ]    
}

const signInDoctorMiddleWare = async (req, res, next) => {
  // const token = req.header('doc-auth-token');
  // if(!token) return res.status(401).send('Access Denied. No token provided');

  // const decoded = Jwt.verify(token, process.env.JWTKEY);

  let errormessages = [];

  const validationErrors = validationFunction(req, res);

  if(validationErrors?.length){
    validationErrors.map((error) => (errormessages.push(error.msg)));
    return res.status(400).json({errors: errormessages})
  }else{
    next();
  }
}

const setAvailabilitySlotsMiddleWare = async (req, res, next) => {
  // const token = req.header('doc-auth-token');
  // if(!token) return res.status(400).send('Not Authorized.');

  // try {
  //   jwt.verify(token, process.env.JWTKEY)
  // } catch (error) {
  //   return res.status(400).send('Not Authorized. Invalid credential Pass.');  
  // }
  next();
}

module.exports = {
  addDoctorMiddleWare, docSignUpValidations,
  signInDoctorMiddleWare, docSignInValidations,
  setAvailabilitySlotsMiddleWare
}
