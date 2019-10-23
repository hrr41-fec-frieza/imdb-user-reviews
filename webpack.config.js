const path = require('path');

const CLIENT = path.join(__dirname, '/client');
const PUBLIC = path.join(__dirname, '/public');

module.exports = {
  entry: `${CLIENT}/index.jsx`,
  output: {
    path: PUBLIC,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?\b/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
};
