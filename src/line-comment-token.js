import { Token } from './token';

/**
 * Token to skip until end of line
 */
export class LineCommentToken extends Token {
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

/**
 * @param {Class} baseToken
 * @param {string} prefix
 */
export function makeLineCommentToken(baseToken, prefix) {
  return class LineCommentToken extends baseToken {
    static get firstChars() {
      return prefix;
    }
  };
}
