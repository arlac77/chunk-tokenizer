import { Token } from './token';
import { characterSetFromString } from './util';

const firstIdentifierChars = characterSetFromString('0123456789');

export class NumberToken extends Token {
  static get possibleFirstChars() {
    return firstIdentifierChars;
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

  constructor(value) {
    super();
    Object.defineProperty(this, 'value', { value: value });
  }

  get type() {
    return 'number';
  }
}
