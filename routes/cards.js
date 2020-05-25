const cards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.delete('/:cardId', deleteCard);
cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/),
  }),
}), createCard);
cards.put('/:cardId/likes', likeCard);
cards.delete('/:cardId/likes', dislikeCard);

module.exports = cards;
