import Token from './token';

export default class WhitespaceIgnoreToken extends Token {
  static parse(pp) {
    let str = pp.chunk[pp.offset];

    if (str === ' ' || str === '\t') {
      pp.offset++;
    }

    return undefined;
  }

  get type() {
    return 'space';
  }
}
