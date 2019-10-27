const Promise = require('bluebird');
const casual = require('casual');
const mysql = require('mysql');
const { user, password, database } = require('./database/config.js');

const seedDatabase = () => {
  casual.seed(1);
  const db = mysql.createConnection({ user, password });
  Promise.promisifyAll(db);

  Promise.try(() => {
    return db.connectAsync();
  })
    .then(() => {
      console.log('CREATING DATABASE...');
      const sql = 'CREATE DATABASE IF NOT EXISTS mooviesdb_user_reviews;';
      return db.queryAsync(sql);
    })
    .then(() => { console.log('DATABASE CREATED.'); })
    .then(() => db.changeUserAsync({ database }))
    .then(() => { console.log('CREATING TABLES...'); })
    .then(() => db.queryAsync('DROP TABLE IF EXISTS reviews;'))
    .then(() => db.queryAsync('DROP TABLE IF EXISTS movies;'))
    .then(() => {
      const sql = `CREATE TABLE movies (
        id INT NOT NULL PRIMARY KEY,
        title VARCHAR(175)
        );`;
      return db.queryAsync(sql);
    })
    .then(() => {
      const sql = `CREATE TABLE reviews (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50),
        date DATE,
        rating INT NOT NULL,
        headline VARCHAR(175),
        body VARCHAR(10000),
        spoilers BIT(1),
        recs INT NOT NULL,
        rec_total INT NOT NULL,
        movie_id INT,
        CONSTRAINT
          FOREIGN KEY (movie_id) REFERENCES movies(id)
        );`;
      return db.queryAsync(sql);
    })
    .then(() => { console.log('TABLES CREATED.\nSEEDING DUMMY DATA...'); })
    .then(() => {
      const values = [];
      for (let i = 100; i < 200; i += 1) {
        values.push([i, casual.title]);
      }
      const sql = 'INSERT INTO movies (id, title) VALUES ?;';
      return db.queryAsync(sql, [values]);
    })
    .then(() => {
      const values = [];
      for (let i = 100; i < 200; i += 1) {
        const amount = casual.integer(5, 50);
        for (let ii = 0; ii < amount; ii += 1) {
          const recTotal = casual.integer(0, 1000);
          const recs = Math.floor(casual.random * recTotal);
          const record = [
            casual.username,
            casual.date('YYYYMMDD'),
            casual.integer(0, 10),
            casual.sentence,
            casual.sentences(casual.integer(1, 25)),
            0,
            recs,
            recTotal,
            i,
          ];
          values.push(record);
        }
      }
      const sql = `INSERT INTO reviews (
        username,
        date,
        rating,
        headline,
        body,
        spoilers,
        recs,
        rec_total,
        movie_id
        ) VALUES ?`;
      db.queryAsync(sql, [values]);
    })
    .then(() => { console.log('DATABASE SEEDED.'); })
    .then(() => db.end());
};

seedDatabase();
