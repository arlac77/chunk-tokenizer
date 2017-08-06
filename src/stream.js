const { Transform } = require('stream');

export default class TokenizerTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    console.log(chunk);
    callback();
  }
}
