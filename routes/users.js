const users = require('express').Router();
const { createUser, getAllUsers, getUserbyId } = require('../controllers/users');

users.get('/users', getAllUsers)
users.get('/users/:userId', getUserbyId)
users.post('/users', createUser)

module.exports = users