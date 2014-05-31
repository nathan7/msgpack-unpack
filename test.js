'use strict'; /* global it:true */
var assert = require('assert')
  , parse_ = require('./')

function parse(x) {
  if (!(x instanceof Array)) x = [].slice.call(arguments)
  return parse_(x)
}

// primitive singleton values

it('should handle nil', function() {
  assert.equal(parse(0xC0), null)
})

it('should handle false', function() {
  assert.equal(parse(0xC2), false)
})

it('should handle true', function() {
  assert.equal(parse(0xC3), true)
})

// single-byte primitive values

it('should handle positive fixints', function() {
  assert.equal(parse(0x70), 0x70)
})

it('should handle negative fixints', function() {
  assert.equal(parse(0xFE), -2)
})

// multi-byte primitive values
it('should handle int 8s', function() {
  assert.equal(parse(0xD0, 0xFF), -1)
})

it('should handle int 16s', function() {
  assert.equal(parse(0xD1, 0xFF, 0xFF), -1)
})

it('should handle int 32s', function() {
  assert.equal(parse(0xD2, 0xFF, 0xFF, 0xFF, 0xFF), -1)
})

it('should refuse to handle int 64s', function() {
  var err
  try { parse(0xD3, 0x00, 0x00, 0x00, 0x00
                  , 0x00, 0x00, 0x00, 0x00) }
  catch (e) { err = e }
  assert.ok(err)
})


it('should handle uint 8s', function() {
  assert.equal(parse(0xCC, 0xFF), 0xFF)
})

it('should handle uint 16s', function() {
  assert.equal(parse(0xCD, 0xFF, 0xFF), 0xFFFF)
})

it('should handle uint 32s', function() {
  assert.equal(parse(0xCE, 0xFF, 0xFF, 0xFF, 0xFF), 0xFFFFFFFF)
})

it('should refuse to handle uint 64s', function() {
  assert.throws(function() {
    parse(0xD3, 0x00, 0x00, 0x00, 0x00
              , 0x00, 0x00, 0x00, 0x00)
  })
})


// empty length-specified primitive values

it('should handle empty str 8s', function() {
  assert.equal(parse(0xD9, 0x00), '')
})

it('should handle empty str 16s', function() {
  assert.equal(parse(0xDA, 0x00, 0x00), '')
})

it('should handle empty str 32s', function() {
  assert.equal(parse(0xDB, 0x00, 0x00, 0x00, 0x00), '')
})

it('should handle empty bin 8s', function() {
  assert.deepEqual(parse(0xC4, 0x00), new Buffer(0))
})

it('should handle empty bin 16s', function() {
  assert.deepEqual(parse(0xC5, 0x00, 0x00), new Buffer(0))
})

it('should handle empty bin 32s', function() {
  assert.deepEqual(parse(0xC6, 0x00, 0x00, 0x00, 0x00), new Buffer(0))
})

// empty length-embedded complex values

it('should handle empty variable fixmaps', function() {
  assert.deepEqual(parse(0x80), {})
})

it('should handle empty variable fixarrays', function() {
  assert.deepEqual(parse(0x90), [])
})

// empty length-specified complex values

it('should handle empty array 16s', function() {
  assert.deepEqual(parse(0xDC, 0x00, 0x00), [])
})

it('should handle empty array 32s', function() {
  assert.deepEqual(parse(0xDD, 0x00, 0x00, 0x00, 0x00), [])
})

it('should handle empty map 16s', function() {
  assert.deepEqual(parse(0xDE, 0x00, 0x00), {})
})

it('should handle empty map 32s', function() {
  assert.deepEqual(parse(0xDF, 0x00, 0x00, 0x00, 0x00), {})
})

// non-empty length-specified primitive values

it('should handle str 8s', function() {
  assert.equal(parse(0xD9, 0x04, 0x74, 0x65, 0x73, 0x74), 'test')
})

it('should handle str 16s', function() {
  assert.equal(parse(0xDA, 0x00, 0x04, 0x74, 0x65, 0x73, 0x74), 'test')
})

it('should handle str 32s', function() {
  assert.equal(parse(0xDB, 0x00, 0x00, 0x00, 0x04, 0x74, 0x65, 0x73, 0x74), 'test')
})

it('should handle bin 8s', function() {
  assert.deepEqual(parse(0xC4, 0x04, 0x74, 0x65, 0x73, 0x74), new Buffer('test'))
})

it('should handle bin 16s', function() {
  assert.deepEqual(parse(0xC5, 0x00, 0x04, 0x74, 0x65, 0x73, 0x74), new Buffer('test'))
})

it('should handle bin 32s', function() {
  assert.deepEqual(parse(0xC6, 0x00, 0x00, 0x00, 0x04, 0x74, 0x65, 0x73, 0x74), new Buffer('test'))
})


// non-empty complex values

it('should handle fix arrays', function() {
  assert.deepEqual(parse([0x91, 0xC3]), [true])
})

it('should handle fix maps', function() {
  assert.deepEqual(parse([0x81, 0xA1, 0x78, 0xC3]), {x:true})
})

it('should handle array 16s', function() {
  assert.deepEqual(parse([0xDC, 0x00, 0x01, 0xC3]), [true])
})

it('should handle map 16s', function() {
  assert.deepEqual(parse([0xDE, 0x00, 0x01, 0xA1, 0x78, 0xC3]), {x:true})
})

it('should handle array 32s', function() {
  assert.deepEqual(parse([0xDD, 0x00, 0x00, 0x00, 0x01, 0xC3]), [true])
})

it('should handle map 32s', function() {
  assert.deepEqual(parse([0xDF, 0x00, 0x00, 0x00, 0x01, 0xA1, 0x78, 0xC3]), {x:true})
})
