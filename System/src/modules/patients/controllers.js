
const { models: { Patient } } = require('../../models/db-connection');

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
      await Patient.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ContactNumber: req.body.ContactNumber,
        Email: req.body.Email,
        Username: req.body.Username,
        Password: req.body.Password
      });
      return res.status(200).send('SignUp Successful');
    }

  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

module.exports ={
  patientSignUp
};