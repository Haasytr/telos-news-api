const Router = require('express')

const AuthenticateController = require("../controllers/AuthenticateController")

const authenticateRoutes = Router()

authenticateRoutes.route('/authenticate')
  .post(AuthenticateController.login)

module.exports = authenticateRoutes