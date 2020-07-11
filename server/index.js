const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');

require('dotenv').config();

const app = express();

const auth = require('./auth/index.js');

app.use(volleyball); // logger for requests and responses
app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use(express.json()); // json body parser

app.get('/', (req, res) => { // http://localhost:5000/
  res.json({
    message: '🦄🌈✨Hello World! 🌈✨🦄'
  });
});

app.use('/auth', auth); // http://localhost:5000/auth/

function notFound(req, res, next) { // if the request route didn't match any existent route
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) { // middleware to handle errors
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log('Listening on port', port);
});