
const { validationResult } = require('express-validator');

const validationFunction = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return errors.array();
  }
}

module.exports = {
  validationFunction
}