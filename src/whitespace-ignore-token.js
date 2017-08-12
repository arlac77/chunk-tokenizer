import Token from './token';

export default class WhitespaceIgnoreToken extends Token {
  static get firstChars() {
    return ' \t\n\r';
  }

  static parse(tokenizer) {
    const chunk = tokenizer.chunk;
    let str = chunk[tokenizer.chunkOffset];

    while (str === ' ' || str === '\t' || str === '\r' || str === '\n') {
      tokenizer.chunkOffset++;
      str = chunk[tokenizer.chunkOffset];
    }

    return undefined;
  }

  get type() {
    return 'space';
  }
}
