/* eslint-disable max-len */
const Card = require('../models/card')

const errorMessage = { message: 'Произошла ошибка' }

module.exports.createCard = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send(errorMessage))
}


module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send(errorMessage))
}

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.id)
  // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) return Promise.reject(new Error(errorMessage))
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) { return Promise.reject(new Error(errorMessage)) }
      Card.remove(card)
        .then((removedCard) => res.send(removedCard !== null ? { data: card } : { data: 'Такого объекта не существует' }))
        .catch(() => res.status(500).send({ errorMessage }))
    })
    .catch(() => res.status(500).send({ errorMessage }))
}
