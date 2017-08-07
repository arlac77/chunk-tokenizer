import Token from './token';

export default class StringToken extends Token {
  static parse(pp) {
    console.log(`StringToken parse: ${pp.offset}`);

    const tc = pp.chunk[pp.offset];
    let str = '';
    let i = pp.offset + 1;
    let c;
    for (; i < pp.chunk.length; ) {
      c = pp.chunk[i];
      if (c === tc) {
        pp.offset = i + 1;
        return new StringToken(str);
      } else if (c === '\\') {
        i += 1;
        c = pp.chunk[i];
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
            c = parseInt(pp.chunk.substr(i + 1, 4), 16);
            if (!isFinite(c) || c < 0) {
              pp.tokenizer.error('Unterminated string', pp, str);
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
    if (i === pp.chunk.length && c !== tc) {
      pp.tokenizer.error('Unterminated string', pp, str);
    }
  }

  get type() {
    return 'string';
  }
}
