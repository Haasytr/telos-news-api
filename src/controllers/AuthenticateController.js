const { sign } = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/env')

const { compareHash } = require('../lib/hashProvider')

const { authorsDatabase } = require('./AuthorsController')

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

  const isPasswordValid = await compareHash(password, author.password)

  if (!isPasswordValid) {
    return res.status(400).json(loginErrorMessage)
  }

  const token = sign(author, JWT_SECRET, {
    expiresIn: "1h"
  })

  const authorWithoutPassword = { ...author }

  delete authorWithoutPassword.password

  return res.status(200).json({ ...authorWithoutPassword, token })
}


module.exports = {
  login
}