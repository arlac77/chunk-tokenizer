export class Token {
  static get length() {
    return 0;
  }

  static get firstChars() {
    return '';
  }

  static register(tokenizer) {
    for (const c of this.firstChars) {
      tokenizer.maxTokenLengthForFirstChar.set(c, 1);
      tokenizer.registeredTokens.set(c, this);
    }
  }

  static parse() {
    return undefined;
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

  get length() {
    return this.constructor.length;
  }

  toString() {
    return `${this.type}: ${this.value} [${this.precedence}]`;
  }

  led(grammar, left) {
    return left;
  }

  nud() {
    return this;
  }

  combine() {
    return 0;
  }
}
