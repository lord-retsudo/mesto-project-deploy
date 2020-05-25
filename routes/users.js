const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, modifyUser, modifyAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', getUser);
users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), modifyUser);
users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/),
  }),
}), modifyAvatar);

module.exports = users;
