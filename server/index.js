const express = require('express');
const db = require('../database');

const app = express();
const PORT = 65387;

app.use(express.static(__dirname + '/../public'));

app.get('/api/user-reviews', (req, res) => {
  db.getAllReviews((err, data) => {
    res.json(data);
  });
});

app.listen(PORT, () => {});
