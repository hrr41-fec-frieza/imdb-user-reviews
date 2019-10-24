const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database');

const app = express();
const PORT = 65387;

app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

app.get('/api/user-reviews', (req, res) => {
  db.getAllReviews((err, data) => {
    res.json(data);
  });
});

app.listen(PORT, () => {});
