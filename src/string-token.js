import { Token } from './token';
import { characterSetFromString } from './util';

const stringFirstChar = new Set([34]);

export class StringToken extends Token {
  static get possibleFirstChars() {
    return stringFirstChar;
  }

  static get minLength() {
    return 2;
  }

  static get maxLength() {
    return 1014;
  }

  static parse(chunk) {
    chunk.markPosition();

    while (true) {
      const c = chunk.advance();

      if (c === 34) {
        return new this(chunk.extractFromMarkedPosition());
      }

      return undefined;
    }

    /*
    if (c === '\\') {
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
          case '\\':
            c = '\\';
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
        */
  }

  constructor(value) {
    super();
    Object.defineProperty(this, 'value', { value: value });
  }

  get type() {
    return 'string';
  }
}
