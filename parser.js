'use strict';
try { //jshint evil:true
  void new Function('return function*(){yield 1}')
  module.exports = require('./parser.es6')
}
catch (e) {
  module.exports = require('./parser.es5')
}
