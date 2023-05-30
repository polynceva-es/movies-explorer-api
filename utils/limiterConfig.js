const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMS: 1 * 60 * 1000,
  max: 30,
});
