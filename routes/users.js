const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getAllUsers, getUserById } = require('../controllers/users');


users.get('/', getAllUsers);
users.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);


module.exports = users;
