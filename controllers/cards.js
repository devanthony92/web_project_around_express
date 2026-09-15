const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require('../utils/errors');

const DEFAULT_ERROR_MESSAGE = 'Ha ocurrido un error en el servidor';

const handleCardError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: 'Se enviaron datos inválidos' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(NOT_FOUND).send({ message: 'No se encontró ninguna tarjeta con ese id' });
  }
  return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
};

module.exports.getCards = (req, res) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => handleCardError(err, res));
};

module.exports.deleteCard = (req, res) => Card.findByIdAndDelete(req.params.cardId)
  .orFail()
  .then((card) => res.send(card))
  .catch((err) => handleCardError(err, res));

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send(card))
  .catch((err) => handleCardError(err, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send(card))
  .catch((err) => handleCardError(err, res));
