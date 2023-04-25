const { verify } = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/env')


const invalidTokenMessage = {
  error: '@authenticate/invalid-token',
  message: 'invalid token'
}

const verifyAuthenticate = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      error: '@authenticate/missing-token',
      message: "token not found"
    })
  }

  const [prefix, token] = authorization.split(' ')

  if (prefix !== 'Bearer') {
    return res.status(401).json(invalidTokenMessage)
  }

  if (!token) {
    return res.status(401).json(invalidTokenMessage)
  }

  verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json(invalidTokenMessage)
    }

    req.user = decoded;

    return next()
  })

}

module.exports = {
  verifyAuthenticate
}