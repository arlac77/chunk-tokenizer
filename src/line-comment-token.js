import { Token } from './token';

/**
 * Token to skip until end of line
 */
export class LineCommentToken extends Token {
  static parse(chunk) {
    while (true) {
      const c = chunk.advance();
      if (c === 10) {
        tokenizer.lineEndReached();
        return undefined;
      }
      if (c === 0) {
        break;
      }
    }
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
    static get possibleFirstChars() {
      return prefix;
    }
  };
}
