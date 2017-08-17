import Token from './token';

export default class WhitespaceIgnoreToken extends Token {
  static get firstChars() {
    return ' \t\n\r';
  }

  static parse(tokenizer) {
    const chunk = tokenizer.chunk;
    let c;

    c = chunk[tokenizer.chunkOffset];

    do {
      if (c === '\n') {
        tokenizer.newLine();
      }

      tokenizer.chunkOffset++;
      c = chunk[tokenizer.chunkOffset];
    } while (c === ' ' || c === '\t' || c === '\r' || c === '\n');

    return undefined;
  }

  get type() {
    return 'space';
  }
}
