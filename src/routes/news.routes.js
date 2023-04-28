const Router = require('express')

const newsController = require("../controllers/NewsController")

const newsRoutes = Router()

const { verifyAuthenticate } = require('../middleware/verifyAuthentication')

newsRoutes.route('/news/')
  .post(verifyAuthenticate, newsController.create)

newsRoutes.route('/news/:id?')
  .get(newsController.read)


newsRoutes.route("/news/:id")
  .put(verifyAuthenticate, newsController.update)

module.exports = newsRoutes