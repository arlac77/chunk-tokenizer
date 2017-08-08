export default class Token {
  static get firstChars() {
    return '';
  }

  static register(tokenizer) {
    //console.log(`register: ${this.name} : ${this.firstChars}`);
    for (const c of this.firstChars) {
      tokenizer.maxTokenLengthForFirstChar[c] = 1;
      tokenizer.registeredTokens[c] = this;
    }
  }

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
