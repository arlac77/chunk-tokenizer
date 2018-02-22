import { Token } from './token';

export class EOFToken extends Token {
  get type() {
    return 'eof';
  }
}
