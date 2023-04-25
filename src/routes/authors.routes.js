const Router = require('express')

const authorsController = require("../controllers/authors")

const authorsRoutes = Router()

authorsRoutes.route('/authors')
  .get(authorsController.readAll)
  .post(authorsController.create)

authorsRoutes.route("/authors/:id")
  .put(authorsController.update)
  .delete(authorsController.remove)

module.exports = authorsRoutes