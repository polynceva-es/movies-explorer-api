require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
const { NODE_ENV, DB_CONNECTION } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECTION : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use('/', appRouter);

app.listen(PORT);
