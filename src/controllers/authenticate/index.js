const { compareHash } = require('../../lib/hashProvider')
const { sign } = require('jsonwebtoken')

const { authorsDatabase } = require('../authors')

const loginErrorMessage = {
  error: '@authenticate/login',
  message: "Invalid email or password"
}

const login = async (req, res) => {
  const { email, password } = req.body

  const author = authorsDatabase.find((author) => author.email === email)

  if (!author) {
    return res.status(400).json(loginErrorMessage)
  }

  const isPasswordValid = compareHash(password, author.password)

  if (!isPasswordValid) {
    return res.status(400).json(loginErrorMessage)
  }

  const token = sign(author, "tY8rC9imdO", {
    expiresIn: "1h"
  })

  delete author.password

  return res.status(200).json({ ...author, token })
}


module.exports = {
  login
}