const http2 = require('node:http2');

const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = http2.constants;

/* eslint no-unused-vars: ["error", { "args": "none" }] */
function errorHandler(err, req, res, next) {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
  }
}

module.exports = errorHandler;
