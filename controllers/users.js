const User = require('../models/user');
export const errorMessage = { message: 'Произошла ошибка' };

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(errorMessage));
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send(errorMessage));
}
module.exports.getUserbyId = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send(errorMessage))
};
