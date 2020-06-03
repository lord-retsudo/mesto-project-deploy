const Card = require('../models/cards');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  const owner = req.user._id;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((cards) => {
      if (cards.owner.equals(req.user._id)) {
        res.send({ data: cards });
        return Card.findByIdAndRemove(req.params.cardId);
      }

      return Promise.reject(new ForbiddenError('Карточка с таким id создана не вами'));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};
