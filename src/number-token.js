import Token from './token';

export default class NumberToken extends Token {
  static parse(pp) {
    const m = pp.chunk.match(/^([0-9]+)/);
    if (m) {
      return new NumberToken(parseInt(m[1], 10));
    }

    return undefined;
  }

  get type() {
    return 'number';
  }
}
