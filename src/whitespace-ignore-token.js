import Token from './token';

export default class WhitespaceIgnoreToken extends Token {
  static get firstChars() {
    return ' \t\n\r';
  }

  static parse(pp) {
    let str = pp.chunk[pp.offset];

    while (str === ' ' || str === '\t' || str === '\r' || str === '\n') {
      pp.offset++;
      str = pp.chunk[pp.offset];
    }

    return undefined;
  }

  get type() {
    return 'space';
  }
}
