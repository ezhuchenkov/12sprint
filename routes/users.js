const users = require('express').Router();
const { createUser, getAllUsers, getUserById } = require('../controllers/users');

users.get('/', getAllUsers)
users.get('/:userId', getUserById)
users.post('/', createUser)

module.exports = users