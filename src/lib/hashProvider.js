const { compare, hash } = require('bcrypt');


const generateHash = async (password) => {
  return hash(password, 8)
}

const compareHash = async (password, hashedPassword) => {
  return compare(password, hashedPassword)
}

module.exports = {
  generateHash,
  compareHash
}