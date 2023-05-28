const http2 = require('node:http2');

const { HTTP_STATUS_UNAUTHORIZED } = http2.constants;

class UnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorisedError';
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorisedError;
