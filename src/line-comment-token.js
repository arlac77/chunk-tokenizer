import Token from './token';

/**
 * skips until end of line
 */
export default class LineCommentToken extends Token {
  static parse(pp) {
    while (pp.chunk[pp.offset] !== '\n' && pp.chunk[pp.offset] !== undefined) {
      pp.offset += 1;
    }

    pp.lineNumber += 1;
    pp.firstCharInLine = pp.offset;
    return undefined;

    //return new LineCommentToken(str);
  }

  get type() {
    return 'comment';
  }
}
