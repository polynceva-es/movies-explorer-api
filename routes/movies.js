const moviesRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies');
const { joiIsUrlValid } = require('../utils/isUrlValid');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().alphanum().required(),
    director: Joi.string().alphanum().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().alphanum().required(),
    image: Joi.string().required().custom(joiIsUrlValid),
    trailerLink: Joi.string().required().custom(joiIsUrlValid),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(joiIsUrlValid),
    movieId: Joi.number().required(),
      }),
}), createMovie);
moviesRouter.delete('/:movieId', celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24).required(),
    }),
  }), deleteMovie)

module.exports = moviesRouter;
