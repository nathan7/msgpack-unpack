'use strict';
module.exports = require('has-generators')
  ? require('./parser.es6')
  : require('./parser.es5')
