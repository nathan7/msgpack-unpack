[![Build Status](https://travis-ci.org/nathan7/msgpack-unpack-stream.png?branch=master)](https://travis-ci.org/nathan7/msgpack-unpack-stream)

# msgpack-unpack-stream

 a TransformStream that decodes msgpack.

## Installation

    npm install msgpack-unpack-stream

## ES6

 msgpack-unpack-stream uses generators, and applying regenerator to it breaks it horribly.
 Stick with using actual `--harmony`.

## API

  What it says on the tin.

### MsgpackUnpackStream(options)

  Returns a fresh, delicious unpack stream.

