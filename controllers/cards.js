const http = require('http');
const Card = require('../models/card');
const mongoose = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(http.STATUS_CODES.InternalServerError)
      .send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(http.STATUS_CODES.NotFound).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Передан некорректный id карточки.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(http.STATUS_CODES.NotFound).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Передан некорректный id карточки.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(http.STATUS_CODES.NotFound).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Передан некорректный id карточки.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};
