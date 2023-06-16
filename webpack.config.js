const path = require('path');

module.exports = {
  entry: ['./static/cart.js','./static/checkout.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};