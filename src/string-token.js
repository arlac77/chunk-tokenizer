import Token from './token';

export default class StringToken extends Token {
  static get firstChars() {
    return '"\'';
  }

  static parse(tokenizer, state) {
    const chunk = tokenizer.chunk;

    let str;
    let i;
    let tc;

    if (state) {
      str = state.str;
      tc = state.tc;
      i = tokenizer.chunkOffset;
    } else {
      str = '';
      tc = chunk[tokenizer.chunkOffset];
      i = tokenizer.chunkOffset + 1;
    }

    //console.log(`${i} ${tc} : ${str}`);

    let c;
    for (; i < chunk.length; ) {
      c = chunk[i];
      if (c === tc) {
        tokenizer.chunkOffset = i + 1;
        return new this(str);
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
    if (i === chunk.length /*&& c !== tc*/) {
      tokenizer.partialTokenState = { str, tc };
      return undefined;
      //tokenizer.error('Unterminated string', str);
    }
  }

  constructor(value) {
    super();
    Object.defineProperty(this, 'value', { value: value });
  }

  get type() {
    return 'string';
  }
}
