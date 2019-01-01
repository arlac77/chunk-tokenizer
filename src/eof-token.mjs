import { Token } from './token';

/**
 * Token representing EOF
 */
export class EOFToken extends Token {
  get type() {
    return 'eof';
  }
}
