module.exports.errorMiddleware = (err, req, res) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Произошла ошибка на сервере';

  if (err.name === 'MongoError' && err.code === 11000) {
    status = 409;
    message = 'Пользователь с таким email уже зарегистрирован';
  } else if (err.name === 'ValidationError') {
    status = 400;
    message = 'Переданы некорректные данные';
  } else if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Некорректный токен авторизации';
  }

  res.status(status).send({ message });
};
