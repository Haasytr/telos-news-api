const { v4: uuidv4 } = require('uuid');
const newsRoutes = require('../../routes/news.routes');
const { authorsDatabase } = require('../authors')
const newsDatabase = []

const create = async (req, res) => {
  const { id: author_id } = req.user



  const { title, brief, content, image, publish_date } = req.body

  const news = {
    id: uuidv4(),
    title,
    brief,
    content,
    image,
    publish_date,
    author_id,
    createdAt: new Date(),
    modifiedAt: new Date(),
  }

  newsDatabase.push(news)

  return res.status(201).json(news)
}

const update = async (req, res) => {
  const { id } = req.params
  const { title, brief, content, image } = req.body


  const newsIndex = newsDatabase.findIndex(u => u.id === id)


  if (newsIndex < 0) {
    return res.status(400).json({
      error: '@News/missing-author',
      message: "news not found"
    })
  }

  const newsUpdated = {
    title,
    brief,
    content,
    image,
    modifiedAt: new Date(),
  }

  newsDatabase[newsIndex] = newsUpdated

  return res.status(200).json(newsUpdated)

}

const readAll = async (req, res) => {
  return res.json(newsDatabase)

}

const findByAuthorId = async (req, res) => {
  const { id } = req.params

  const authorExists = authorsDatabase.find(author => author.id == id)

  if (!authorExists) {
    return res.status(400).json({
      error: '@news/missing-author',
      message: "author not found"
    })
  }

  const authorNews = newsDatabase.filter(news => news.author_id === id)

  return res.status(200).json(authorNews)
}

module.exports = {
  create,
  readAll,
  findByAuthorId,
  update
}