const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const cards = require('./cards');
const users = require('./users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.use(auth);

router.use('/cards', cards);
router.use('/users', users);

module.exports = router;
