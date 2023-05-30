const http2 = require('node:http2');

const { HTTP_STATUS_NOT_FOUND } = http2.constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
