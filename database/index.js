const mysql = require('mysql');
const config = require('./config.js');

const db = mysql.createConnection(config);
const query = db.query.bind(db);

const getAllReviews = (callback) => {
  const sql = 'SELECT * FROM reviews;';
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(null, data);
  });
};

module.exports = {
  query,
  getAllReviews,
};
