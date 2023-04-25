const express = require('express')

const { authenticateRoutes, authorsRoutes, newsRoutes } = require('./routes/')


const app = express()

app.use(express.json())

app.use(authenticateRoutes)
app.use(authorsRoutes)

app.use(newsRoutes)


app.listen(3333, () => {
  console.log(`API RUNNING`)
})

