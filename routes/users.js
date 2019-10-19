const users = require('express').Router()
const { getAllUsers, getUserById } = require('../controllers/users')

users.get('/', getAllUsers)
users.get('/:id', getUserById)


module.exports = users
