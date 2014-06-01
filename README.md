[![Build Status](https://travis-ci.org/nathan7/msgpack-unpack.png?branch=master)](https://travis-ci.org/nathan7/msgpack-unpack)

# msgpack-unpack

 decodes msgpack.

## Installation

    npm install msgpack-unpack

## ES6

 msgpack-unpack uses generators.
 There's some wrappage going on using [regenerator](https://github.com/facebook/regenerator) to make this all work on ES5.
 If you're on an ES6 engine, it'll run natively.

## API

  What it says on the tin.

### unpack(buffer)

  Returns fresh, delicious unpacked data.

## Extras

  The [binary-parse-fn](https://github.com/nathan7/binary-parse-fn) style parser is exposed as `msgpack-unpack/parser`.
  This is considered public API.

