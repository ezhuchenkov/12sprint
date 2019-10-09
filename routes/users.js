const users = require('express').Router();
const { createUser, getAllUsers, getUserbyId } = require('../controllers/users');

users.get('/', getAllUsers)
users.get('/:userId', getUserbyId)
users.post('/', createUser)

module.exports = users