const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, modifyUser, modifyAvatar,
} = require('../controllers/users');

users.get('/', getUsers);

users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), modifyUser);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/),
  }),
}), modifyAvatar);

module.exports = users;
