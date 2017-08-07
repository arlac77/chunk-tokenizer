import Token from './token';

export default class NumberToken extends Token {
  static parse(pp) {
    console.log(`NumberToken parse: ${pp.offset}`);

    let str = pp.chunk[pp.offset];
    pp.offset += 1;
    for (; pp.offset < pp.chunk.length; ) {
      const c = pp.chunk[pp.offset];
      if ((c < '0' || c > '9') && c !== '.' && c !== 'e' && c !== 'E') {
        break;
      }
      pp.offset += 1;
      str += c;
    }

    return new NumberToken(+str);
  }

  get type() {
    return 'number';
  }
}
