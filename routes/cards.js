const cards = require('express').Router();
const { createCard, getAllCards, deleteCardById } = require('../controllers/cards');

cards.get('/', getAllCards)
cards.delete('/:id', deleteCardById)
cards.post('/', createCard)

module.exports = cards