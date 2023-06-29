const router = require('express').Router();
const http = require('http');
const cardRoutes = require('./cards');
const userRoutes = require('./users');

router.use('/cards', cardRoutes);
router.use('/users', userRoutes);

router.use('*', (req, res) => {
  res.status(http.STATUS_CODES.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
