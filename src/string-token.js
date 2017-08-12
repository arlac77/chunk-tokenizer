import Token from './token';

export default class StringToken extends Token {
  static get firstChars() {
    return '"\'';
  }

  static parse(tokenizer) {
    const chunk = tokenizer.chunk;
    const tc = chunk[tokenizer.chunkOffset];

    let str = '';
    let i = tokenizer.chunkOffset + 1;
    let c;
    for (; i < chunk.length; ) {
      c = chunk[i];
      if (c === tc) {
        tokenizer.chunkOffset = i + 1;
        return new StringToken(str);
      } else if (c === '\\') {
        i += 1;
        c = chunk[i];
        switch (c) {
          case 'b':
            c = '\b';
            break;
          case 'f':
            c = '\f';
            break;
          case 'n':
            c = '\n';
            break;
          case 'r':
            c = '\r';
            break;
          case 't':
            c = '\t';
            break;
          case 'u':
            c = parseInt(chunk.substr(i + 1, 4), 16);
            if (!isFinite(c) || c < 0) {
              tokenizer.error('Unterminated string', str);
            }
            c = String.fromCharCode(c);
            i += 4;
            break;
        }
        str += c;
        i += 1;
      } else {
        str += c;
        i += 1;
      }
    }
    if (i === chunk.length && c !== tc) {
      tokenizer.error('Unterminated string', str);
    }
  }

  get type() {
    return 'string';
  }
}
