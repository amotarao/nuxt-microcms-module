const path = require('path');

module.exports = function (moduleOptions) {
  const options = {
    ...this.options.microcms,
    ...moduleOptions,
    client: {
      ...this.options.microcms.client,
      ...moduleOptions.client,
    },
  };

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'microcms.js',
    options,
  });
};

module.exports.meta = require('../package.json');
