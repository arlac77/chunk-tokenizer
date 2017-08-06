const { Transform } = require('stream');

export class TokenizerTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    callback();
  }
}
