// for form validations
const {
  check
} = require('express-validator');

// verifies the validations and returns errors if any
const {
  validationFunction
} = require ('../../../config/common/validationHandler');

//Patient Validation check function
const patientSignUpValidations = () => {
  return[
    check('FirstName').notEmpty().withMessage('First Name is required.')
      .isLength({min: 3}).withMessage('First Name should be atleast 3 characters long.'),
    check('LastName').notEmpty().withMessage('Last Name is required.')
      .isLength({ min: 3 }).withMessage('Last Name should be atleast 3 characters long.'),
    check('ContactNumber').notEmpty().withMessage('Contact Number is required.')
      .isNumeric().withMessage('Should contain numbers only.'),
    check('Email').notEmpty().withMessage('Email Required')
      .isEmail().withMessage('Invalid Email.'),
    check('Username').notEmpty().withMessage('Username is required.')
      .isLength({ min: 4 }).withMessage('Username should be atleast 4 characters'),
    check('Password').notEmpty().withMessage('Password Required')
      .isLength({ min: 6 }).withMessage('Password should be 6 characters long atleast.')
  ]    
}

/**
 * Patient Sign In MiddleWare
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const patientSignUpMiddleWare = async (req, res, next) => {
  let errormessages = [];

  const validationErrors = validationFunction(req, res);
  if(validationErrors?.length){
    validationErrors.map((error) => (errormessages.push(error.msg)));
    return res.status(400).json({errors: errormessages})
  }else{
    next();
  }
} 

// validations at signIn time.
const patientSignInValidations = () => {
  return[
    check('Email').notEmpty().withMessage('Email Required')
      .isEmail().withMessage('Invalid Email.'),
    check('Password').notEmpty().withMessage('Password Required')
      .isLength({ min: 6 }).withMessage('Password should be 6 characters long atleast.')
  ]    
}

/**
 * Patient Sign Up MiddleWare. Perform Validations
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const patientSignInMiddleWare = async (req, res, next) => {
  let errormessages = [];

  const validationErrors = validationFunction(req, res);
  if(validationErrors?.length){
    validationErrors.map((error) => (errormessages.push(error.msg)));
    return res.status(400).json({errors: errormessages})
  }else{
    next();
  }
} 

/**
 * Schedule MiddleWare
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const  scheduleAppointmentMiddleware = async (req, res, next) => {
  try {
    if(req.user.isPatient){
      return next();
    }else{
      return res.status(401).send('Unauthorized User');
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

/**
 * Delete Appointment Middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const deleteAppointmentMiddleware = async(req, res, next) => {
  try {
    if(req.user.isPatient){
      return next();
    }else{
      return res.status(401).send('Unauthorized User');
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  patientSignUpMiddleWare, patientSignUpValidations,
  patientSignInMiddleWare, patientSignInValidations,
  scheduleAppointmentMiddleware,
  deleteAppointmentMiddleware
}