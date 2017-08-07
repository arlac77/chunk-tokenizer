import Token from './token';

export default class EOFToken extends Token {
  get type() {
    return 'eof';
  }
}
