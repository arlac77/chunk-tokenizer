import Token from './token';

export class OperatorToken extends Token {
  static get value() {
    return 'xxxx';
  }

  static register(tokenizer) {
    const c = this.value;
    const firstChar = c[0];
    const maxLength = tokenizer.maxTokenLengthForFirstChar[firstChar] || 0;

    if (maxLength < c.length) {
      tokenizer.maxTokenLengthForFirstChar[firstChar] = c.length;
    }

    const p = tokenizer.registeredTokens[c];
    if (p) {
      // TODO dirty hack how to merge nud() and let() tokens
      //console.log(`Token already defined ${c} ${this.nud} <> ${p.nud}`);
      this.nud = p.nud;
      //tokenizer.registeredTokens[c] = Object.assign(this,p);
      tokenizer.registeredTokens[c] = this;
    } else {
      tokenizer.registeredTokens[c] = this;
    }
  }

  static parse(pp) {
    pp.offset += this.value.length;
    console.log(this);
    return new OperatorToken();
  }

  get value() {
    return this.constructor().value;
  }

  get type() {
    return 'operator';
  }
}

export function makeOperatorTokens(baseClass, tokenDefinitions) {
  const tokens = [];

  Object.keys(tokenDefinitions).forEach(key => {
    tokens.push(
      class X extends baseClass {
        static get value() {
          return key;
        }
      }
    );
  });

  return tokens;
}
