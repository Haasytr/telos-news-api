const express = require('express')
const { PORT } = require('./config/env')


const { authenticateRoutes, authorsRoutes, newsRoutes } = require('./routes/')


const app = express()

app.use(express.json())

app.use(authenticateRoutes)
app.use(authorsRoutes)

app.use(newsRoutes)


app.listen(PORT, () => {
  console.log(`API RUNNING ON ${PORT}`)
})

