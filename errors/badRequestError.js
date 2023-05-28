const http2 = require('node:http2');

const { HTTP_STATUS_BAD_REQUEST } = http2.constants;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
