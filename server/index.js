const express = require('express');
const path = require('path');
const db = require('../database');

const app = express();
const PORT = 65387;

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api/user-reviews', (req, res) => {
  db.getAllReviews((err, data) => {
    res.json(data);
  });
});

app.listen(PORT, () => {});
