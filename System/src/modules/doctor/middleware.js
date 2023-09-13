
const {
  check
} = require('express-validator');

const {
  validationFunction
} = require ('../../../config/common/validationHandler');

const docValidations = () => {
  return[
    check('DoctorFirstName').notEmpty().withMessage('First Name is required.')
      .isLength({min: 3}).withMessage('First Name should be atleast 3 characters long.'),
    check('DoctorLastName').notEmpty().withMessage('Last Name is required.')
      .isLength({ min: 3 }).withMessage('Last Name should be atleast 3 characters long.'),
    check('ContactNumber').notEmpty().withMessage('Contact Number is required.')
      .isNumeric().withMessage('Should contain numbers only.'),
    check('Email').notEmpty().withMessage('Email Required')
      .isEmail().withMessage('Invalid Email.'),
    check('Speciality').notEmpty().withMessage('Specialization is Required.'),
    check('Qualifications').notEmpty().withMessage('Enter Qualifications.'),
    check('Consultation_Fee').notEmpty().withMessage('Enter Your Fee.')
      .isNumeric().withMessage('Fee Should be in Numbers.'),
    check('Experience').notEmpty().withMessage('Enter Your Experience.'),
    check('username').notEmpty().withMessage('Username is required.')
      .isLength({ min: 4 }).withMessage('Username should be atleast 4 characters'),
    check('password').notEmpty().withMessage('Password Required')
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

module.exports = {
  addDoctorMiddleWare, docValidations
}

// dekhnay ye
// map and foreach difference
// filter and reduce 
