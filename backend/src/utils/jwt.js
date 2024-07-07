
const jwt = require('jsonwebtoken');
const { SessionExpiredError } = require('./apiResponse');

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new SessionExpiredError("Login session expired");
    }

}

module.exports = {
    generateToken,
    decodeToken
}