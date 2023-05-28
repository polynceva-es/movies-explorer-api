const http2 = require('node:http2');

const { HTTP_STATUS_CONFLICT } = http2.constants;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictError;
