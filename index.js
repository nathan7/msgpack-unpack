'use strict';
module.exports = MsgpackUnpackStream
var BinaryParseStream = require('binary-parse-stream')
  , inherits = require('util').inherits

inherits(MsgpackUnpackStream, BinaryParseStream)
function MsgpackUnpackStream(options) {
  if (!(this instanceof MsgpackUnpackStream)) return new MsgpackUnpackStream(options)
  BinaryParseStream.call(this, options)
}

MsgpackUnpackStream.prototype._parse = require('./parser')
