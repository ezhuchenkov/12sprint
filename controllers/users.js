import { find, findById } from '../models/user'

// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs')
const User = require('../models/user')


const errorMessage = { message: 'Произошла ошибка' }

export function createUser(req, res) {
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

export function getAllUsers(req, res) {
  find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send(errorMessage))
}
export function getUserById(req, res) {
  findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send(errorMessage))
}
