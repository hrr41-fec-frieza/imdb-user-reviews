const casual = require('casual');
const db = require('./database');

const seedDatabase = (callback = () => {}) => {
  let sql = 'DROP TABLE IF EXISTS reviews;';

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
    const date = casual.date('MMDD');
    const rating = casual.integer(0, 10);
    const headline = casual.sentence;
    const body = casual.sentences(casual.integer(1, 15));
    const record = `"${username}", "2019${date}", ${rating}, "${headline}", "${body}", b'0', 50, 100`;
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

seedDatabase();
