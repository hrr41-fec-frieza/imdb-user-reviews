const Promise = require('bluebird');
const casual = require('casual');
const mysql = require('mysql');
const { user, password, database } = require('./database/config.js');

const createDatabase = () => {
  const db = mysql.createConnection({ user, password });
  const sql = 'CREATE DATABASE IF NOT EXISTS mooviesdb_user_reviews;';
  const callback = () => { db.end(); };

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

const seedDatabase = (callback = () => {}) => {
  const db = mysql.createConnection({ user, password, database });
  let sql = '';

  db.query('DROP TABLE IF EXISTS reviews;', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });

  db.query('DROP TABLE IF EXISTS movies;', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });

  sql = `CREATE TABLE movies (
    id INT NOT NULL,
    title VARCHAR(175)
    );`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });

  sql = `CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    date DATE,
    rating INT NOT NULL,
    headline VARCHAR(175),
    body VARCHAR(10000),
    spoilers BIT(1),
    recs INT NOT NULL,
    rectotal INT NOT NULL,
    PRIMARY KEY (id)
    );`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });

  for (let i = 0; i < 100; i += 1) {
    const username = casual.username;
    const date = casual.date('YYYYMMDD');
    const rating = casual.integer(0, 10);
    const headline = casual.sentence;
    const body = casual.sentences(casual.integer(1, 15));
    const record = `"${username}", "${date}", ${rating}, "${headline}", "${body}", b'0', 50, 100`;
    sql = `INSERT INTO reviews (username, date, rating, headline, body, spoilers, recs, rectotal) VALUES(${record})`;
    db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, data);
      }
    });
  }
};

Promise.try(() => {
  createDatabase();
}).then(() => {
  seedDatabase();
});
