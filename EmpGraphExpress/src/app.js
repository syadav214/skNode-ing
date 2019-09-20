const express = require('express');
const app = express();

app.use((req, res, next) => {
  if (req.path == '/1') {
    res.status(500).send('Something broke!');
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/1', (req, res) => {
  res.send('Hello World-1');
});

module.exports = app;
