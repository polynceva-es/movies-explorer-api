const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const appRouter = require('express').Router();
const helmet = require('helmet');
const limiter = require('../utils/limiterConfig');
const { login, createUser, celebrateParams } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const errorHandler = require('../middlewares/errorHadler');
const corsHandler = require('../middlewares/corsHandler');

const {
  name,
  email,
  password,
} = celebrateParams;

appRouter.use(helmet());
appRouter.use(requestLogger); // подключаем логгер запросов
appRouter.use(limiter);
appRouter.use(corsHandler);
appRouter.use(bodyParser.json());

appRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email, password,
  }),
}), login);
appRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name, email, password,
  }),
}), createUser);
appRouter.use('/users', auth, usersRouter);
appRouter.use('/movies', auth, moviesRouter);
appRouter.use('*', auth, (req, res, next) => { next(new NotFoundError('Страница не найдена')); });
appRouter.use(errorLogger); // подключаем логгер ошибок
appRouter.use(errors());
appRouter.use(errorHandler);
module.exports = appRouter;
