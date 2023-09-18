
const patientSignUpMiddleWare = async (req, res, next) => {
  next();
} 

const patientSignInMiddleWare = async (req, res, next) => {
  next();
} 

const scheduleAppointmentMiddleware = async (req, res, next) => {
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
  patientSignUpMiddleWare,
  patientSignInMiddleWare,
  scheduleAppointmentMiddleware,
  deleteAppointmentMiddleware
}