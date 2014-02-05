'use strict';
module.exports = parse

function* parse() {
  var first = yield -1

  // positive fixint
  if (first < 0x80)
    return first

  // fixmap
  if (first < 0x90)
    return yield* parseMap(first & 0xF)

  // fixarray
  if (first < 0xA0)
    return yield* parseArray(first & 0xF)

  // fixstr
  if (first < 0xC0)
    return (yield (first & 0x1F)).toString()

  // nil
  if (first === 0xC0)
    return null
  // 0xC1 intentionally missing
  // false
  if (first === 0xC2)
    return false
  // true
  if (first === 0xC3)
    return true

  // bin 8
  if (first === 0xC4)
    return yield (yield -1)
  // bin 16
  if (first === 0xC5)
    return yield (yield 2).readUInt16BE(0, true)
  // bin 32
  if (first === 0xC6)
    return yield (yield 4).readUInt32BE(0, true)

  // ext 8
  // ext 16
  // ext 32

  // float 32
  if (first === 0xCA)
    return (yield 4).readFloatBE(0, true)
  // float 64
  if (first === 0xCB)
    return (yield 8).readDoubleBE(0, true)

  if (first === 0xCC)
    return yield -1
  if (first === 0xCD)
    return (yield 2).readUInt16BE(0, true)
  if (first === 0xCE)
    return (yield 4).readUInt32BE(0, true)
  // int 64 @ 0xCF intentionally unimplemented

  // int 8
  if (first === 0xD0)
    return (yield 1).readInt8(0, true)
  // int 16
  if (first === 0xD1)
    return (yield 2).readInt16BE(0, true)
  // int 32
  if (first === 0xD2)
    return (yield 4).readInt32BE(0, true)
  // int 64 @ 0xD3 intentionally unimplemented

  // fixext 1
  // fixext 2
  // fixext 4
  // fixext 8
  // fixext 16

  // str 8
  if (first === 0xD9)
    return (yield (yield -1)).toString()
  // str 16
  if (first === 0xDA)
    return (yield (yield 2).readUInt16BE(0, true)).toString()
  // str 32
  if (first === 0xDB)
    return (yield (yield 4).readUInt32BE(0, true)).toString()

  // array 16
  if (first === 0xDC)
    return yield* parseArray((yield 2).readUInt16BE(0, true))
  // array 32
  if (first === 0xDD)
    return yield* parseArray((yield 4).readUInt32BE(0, true))

  // map 16
  if (first === 0xDE)
    return yield* parseMap((yield 2).readUInt16BE(0, true))
  // map 32
  if (first === 0xDF)
    return yield* parseMap((yield 4).readUInt32BE(0, true))

  // negative fixint
  if (first >= 0xE0)
    return (first & 0x1F) - 32

  throw new Error('unknown msgpack type 0x' + first.toString(16))
}

function* parseArray(len) {
  var arr = []
  for (var i = 0; i < len; i++)
    arr.push(yield* parse())
  return arr
}

function* parseMap(len) {
  var obj = {}
  for (var i = 0; i < len; i++) {
    var key = yield* parse()
      , val = yield* parse()
    obj[key] = val
  }
  return obj
}
