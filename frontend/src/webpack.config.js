const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      'url': require.resolve('url/'),
      'crypto': require.resolve('crypto-browserify')
    }
  }
};