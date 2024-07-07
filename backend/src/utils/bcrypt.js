const bcrypt = require('bcrypt');
const { InternalServerError } = require('./apiResponse');

// Hashes a plain text password
async function hashPassword(plainTextPassword) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    return hash;
  } catch (err) {
    throw new InternalServerError("Error hashing password");
  }
}

// Compares a plain text password with a hash
async function comparePassword(plainTextPassword, hash) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hash);
    return match;
  } catch (err) {
    throw new InternalServerError("Error comparing passwords");
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};

module.exports = {
    hashPassword,
    comparePassword
    }   
