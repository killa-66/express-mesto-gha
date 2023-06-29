const http = require('http');
const User = require('../models/user');
const mongoose = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(http.STATUS_CODES.InternalServerError).send({ message: 'Произошла ошибка', error: err }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(http.STATUS_CODES.NotFound).send({ message: 'Пользователь не найден.' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Передан некорректный id пользователя.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(http.STATUS_CODES.BadRequest).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(http.STATUS_CODES.InternalServerError).send({ message: err.message });
      }
    });
};
