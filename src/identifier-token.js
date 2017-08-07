import Token from './token';

export default class IdentifierToken extends Token {
  static get firstChars() {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
  }

  static parse(pp) {
    let i = pp.offset + 1;
    for (;;) {
      const c = pp.chunk[i];
      if (
        (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c >= '0' && c <= '9') ||
        c === '_'
      ) {
        i += 1;
      } else {
        break;
      }
    }

    const o = pp.offset;
    pp.offset = i;
    return new IdentifierToken(pp.chunk.substring(o, i));
  }

  get type() {
    return 'identifer';
  }
}
