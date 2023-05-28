const usersRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUserInfo, updateUserInfo, celebrateParams } = require('../controllers/users');

const {
  name,
  email,
} = celebrateParams;

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({ name, email }),
}), updateUserInfo);

module.exports = usersRouter;
