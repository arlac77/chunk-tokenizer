import Token from './token';

/**
 * skips until end of line
 */
export default class LineCommentToken extends Token {
  static parse(tokenizer) {
    while (
      tokenizer.chunk[tokenizer.chunkOffset] !== '\n' &&
      tokenizer.chunk[tokenizer.chunkOffset] !== undefined
    ) {
      tokenizer.chunkOffset += 1;
    }

    tokenizer.newLine();
    return undefined;
  }

  get type() {
    return 'comment';
  }
}
