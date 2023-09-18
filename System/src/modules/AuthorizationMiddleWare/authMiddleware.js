
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(404).send('Access Denied. No token provided');

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).send(`Invalid Token ${error.message}`)
  }
}

module.exports = {
  auth
};