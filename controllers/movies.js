const mongoose = require('mongoose');
const http2 = require('node:http2');
const Movie = require('../models/movie');

const { HTTP_STATUS_CREATED } = http2.constants;
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => { next(err); });
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      movie.populate('owner')
        .then((resultMovie) => res.status(HTTP_STATUS_CREATED).send(resultMovie))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else { next(err); }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(`Фильм с указанным id:${movieId} не найден`);
      } else if (movie.owner.valueOf() === userId) {
        movie.deleteOne()
          .then(res.send({ message: 'Фильм удалён' }))
          .catch((err) => next(err));
      } else {
        throw new ForbiddenError('Вы не являетесь владельцем карточки с фильмом');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Передан некорректный id:${movieId}`));
      } else { next(err); }
    });
};
