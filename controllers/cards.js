const Card = require('../models/card');
const errorMessage = { message: 'Произошла ошибка' };

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send(errorMessage));
};


module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send(errorMessage));
}

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send(errorMessage))
};
