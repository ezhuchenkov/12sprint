const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const errorMessage = { message: 'Произошла ошибка' }

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id, name: user.name, about: user.about, email: user.email,
      })
    })
    .catch(() => {
      res.status(400).send(errorMessage)
    })
}

module.exports.login = (req, res) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      )
      res
        .status(201)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        }).send({ message: 'Добро пожаловать!' })
    })
    .catch(() => {
      res.status(401).send({ errorMessage })
    })
}

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send(errorMessage))
}
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send(errorMessage))
}
