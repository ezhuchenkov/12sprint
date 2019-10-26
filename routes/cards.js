const cards = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { createCard, getAllCards, deleteCardById } = require('../controllers/cards')
const urlRegExp = require('../models/card')

cards.get('/', getAllCards)

cards.delete('/:id', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }).unknown(true),
}), deleteCardById)

cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegExp),
  }).unknown(true),
}), createCard)

module.exports = cards
