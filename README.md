[![Build Status](https://travis-ci.org/nathan7/msgpack-unpack-stream.png?branch=master)](https://travis-ci.org/nathan7/msgpack-unpack-stream)

# msgpack-unpack-stream

 a TransformStream that decodes msgpack.

## Installation

    npm install msgpack-unpack-stream

## ES6

 msgpack-unpack-stream uses generators.
 There's some wrappage going on using [regenerator](https://github.com/facebook/regenerator) to make this all work on ES5.
 If you're on an ES6 engine, it'll run natively.

## API

  What it says on the tin.

### MsgpackUnpackStream(options)

  Returns a fresh, delicious unpack stream.

