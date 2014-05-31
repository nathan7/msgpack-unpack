'use strict';
var BinaryParser = require('binary-parse-fn')
  , parser = require('./parser')

exports = module.exports = BinaryParser(parser)
exports.parser = parser
