const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require('../utils/errors');

const DEFAULT_ERROR_MESSAGE = 'Ha ocurrido un error en el servidor';

const handleUserError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: 'Se enviaron datos inválidos' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(NOT_FOUND).send({ message: 'No se encontró ningún usuario con ese id' });
  }
  return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
};

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));

module.exports.getUserById = (req, res) => User.findById(req.params.userId)
  .orFail()
  .then((user) => res.send(user))
  .catch((err) => handleUserError(err, res));

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, res));
};
