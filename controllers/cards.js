/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');
const RequestError = require('../errors/req-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new RequestError('Ошибка создания карты');
      }
      res.send({ data: card });
    })
    .catch(next);
};


module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
  // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) return Promise.reject(new NotFoundError('Указанная карточка не найдена'));
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) { return Promise.reject(new AuthError('Вы не являетесь автором карточки')); }
      Card.remove(card)
        .then((removedCard) => res.send(removedCard !== null ? { data: card } : { data: 'Такого объекта не существует' }))
        .catch(next);
    })
    .catch(next);
};
