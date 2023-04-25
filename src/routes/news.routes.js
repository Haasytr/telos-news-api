const Router = require('express')

const newsController = require("../controllers/news")

const newsRoutes = Router()

const { verifyAuthenticate } = require('../middleware/verifyAuthentication')

newsRoutes.route('/news')
  .post(verifyAuthenticate, newsController.create)
  .get(newsController.readAll)

newsRoutes.route("/news/:id")
  .put(verifyAuthenticate, newsController.update)
  .get(newsController.findByAuthorId)

module.exports = newsRoutes