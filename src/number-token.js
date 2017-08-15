import Token from './token';

export default class NumberToken extends Token {
  static get firstChars() {
    return '0123456789';
  }

  static parse(tokenizer) {
    const chunk = tokenizer.chunk;
    let str = chunk[tokenizer.chunkOffset];

    tokenizer.chunkOffset += 1;
    for (; tokenizer.chunkOffset < chunk.length; ) {
      const c = chunk[tokenizer.chunkOffset];
      if ((c < '0' || c > '9') && c !== '.' && c !== 'e' && c !== 'E') {
        break;
      }
      tokenizer.chunkOffset += 1;
      str += c;
    }

    return new this(+str);
  }

  get type() {
    return 'number';
  }
}
