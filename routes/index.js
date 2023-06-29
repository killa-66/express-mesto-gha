const router = require('express').Router();
const cardRoutes = require('./cards');
const userRoutes = require('./users');

router.use('/cards', cardRoutes);
router.use('/users', userRoutes);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
