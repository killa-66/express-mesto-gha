const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'T6k397vvT!$3kr');
  } catch (err) {
    const authError = new Error('Необходима авторизация');
    authError.statusCode = 401;
    return next(authError);
  }

  req.user = payload;

  return next();
};
