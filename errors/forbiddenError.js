const http2 = require('node:http2');

const { HTTP_STATUS_FORBIDDEN } = http2.constants;

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
