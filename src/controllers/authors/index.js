const { v4: uuidv4 } = require('uuid');

const { generateHash } = require('../../lib/hashProvider')

const authorsDatabase = []

const create = async (req, res) => {

  const { name, biography, email, password } = req.body

  const emailAlreadyExists = authorsDatabase.find(author => author.email === email)


  if (emailAlreadyExists) {
    return res.status(400).json({
      error: '@Authors/create',
      message: "Email already in use"
    })
  }

  const hashedPassword = await generateHash(password)

  const author = {
    id: uuidv4(),
    name,
    biography,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    modifiedAt: new Date(),
  }


  authorsDatabase.push(author)

  return res.json(author).status(201)

}

const readAll = async (req, res) => {
  return res.json(authorsDatabase)
}

const update = async (req, res) => {
  const { id } = req.params
  const { name, biography, email, password } = req.body


  const authorIndex = authorsDatabase.findIndex(u => u.id === id)


  if (authorIndex < 0) {
    return res.status(400).json({
      error: '@Authors/missing-author',
      message: "author not found"
    })
  }

  const authorUpdated = {
    id,
    name,
    biography,
    email,
    password,
    modifiedAt: new Date(),
  }

  authorsDatabase[authorIndex] = authorUpdated

  return res.status(200).json(authorUpdated)

}

const remove = async (req, res) => {
  const { id } = req.params


  const authorIndex = authorsDatabase.findIndex(u => u.id === id)

  if (authorIndex < 0) {
    return res.status(400).json({
      error: '@Authors/missing-author',
      message: "author not found"
    })
  }

  authorsDatabase.splice(authorIndex, 1)

  return res.status(200).json(authorsDatabase)

}

module.exports = {
  create,
  readAll,
  update,
  remove,
  authorsDatabase
}