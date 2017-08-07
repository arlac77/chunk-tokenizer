export default class Token {
  static parse(chunk) {
    return undefined;
  }

  constructor(value) {
    Object.defineProperty(this, 'value', { value: value });
  }

  get type() {
    return 'unknown';
  }

  get precedence() {
    return 0;
  }

  get value() {
    return undefined;
  }

  toString() {
    return `${this.type}: ${this.value} [${this.precedence}]`;
  }

  led(grammar, left) {
    return left;
  }

  nud(grammar) {
    return this;
  }

  combine() {
    return 0;
  }
}
