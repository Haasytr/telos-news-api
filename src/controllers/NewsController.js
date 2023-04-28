const { v4: uuidv4 } = require('uuid');
const { authorsDatabase } = require('./AuthorsController')
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

  const createdAt = newsDatabase[newsIndex]['createdAt']
  const authorId = newsDatabase[newsIndex]['author']

  const newsUpdated = {
    title,
    brief,
    content,
    image,
    author_id: authorId,
    modifiedAt: new Date(),
    createdAt

  }

  newsDatabase[newsIndex] = newsUpdated

  return res.status(200).json(newsUpdated)

}

const read = async (req, res) => {
  const author_id = req.params.id

  if (!author_id) {
    return res.json(newsDatabase)
  }

  const authorExists = authorsDatabase.filter(author => author.id === author_id)

  if (authorExists < 1) {
    return res.status(404).json({
      error: '@news/read',
      message: 'Author not found'
    })
  }

  const authorNews = newsDatabase.filter(news => news.author_id === author_id)

  return res.status(200).json(authorNews)


}

module.exports = {
  create,
  read,
  update
}