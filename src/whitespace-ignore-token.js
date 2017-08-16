import Token from './token';

export default class WhitespaceIgnoreToken extends Token {
  static get firstChars() {
    return ' \t\n\r';
  }

  static parse(tokenizer) {
    const chunk = tokenizer.chunk;
    let c;

    do {
      tokenizer.chunkOffset++;
      c = chunk[tokenizer.chunkOffset];

      if (c === '\n') {
        tokenizer.newLine();
        continue;
      }
    } while (c === ' ' || c === '\t' || c === '\r' || c === '\n');

    return undefined;
  }

  get type() {
    return 'space';
  }
}
