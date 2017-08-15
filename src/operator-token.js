import Token from './token';

export class OperatorToken extends Token {
  static get value() {
    return '';
  }

  static register(tokenizer) {
    const value = this.value;
    const firstChar = value[0];
    const maxLength = tokenizer.maxTokenLengthForFirstChar.get(firstChar) || 0;

    if (maxLength < value.length) {
      tokenizer.maxTokenLengthForFirstChar.set(firstChar, value.length);
    }

    const p = tokenizer.registeredTokens.get(value);
    if (p) {
      this.nud = p.nud;
    }

    tokenizer.registeredTokens.set(value, this);
  }

  static parse(tokenizer) {
    tokenizer.chunkOffset += this.value.length;
    return new this();
  }

  get value() {
    return this.constructor.value;
  }

  get type() {
    return 'operator';
  }
}

export class InfixOperatorToken extends OperatorToken {
  led(grammar, left) {
    return this.combine(left, grammar.expression(this.precedence));
  }
}

export class InfixRightOperatorToken extends OperatorToken {
  led(grammar, left) {
    return this.combine(left, grammar.expression(this.precedence - 1));
  }
}

export class PrefixOperatorToken extends OperatorToken {
  nud(grammar, left) {
    return this.combine(left, grammar.expression(this.precedence));
  }
}

export function makeOperatorTokens(baseToken, tokenDefinitions) {
  const tokens = [];

  Object.keys(tokenDefinitions).forEach(key => {
    tokens.push(
      class X extends baseToken {
        static get value() {
          return key;
        }
      }
    );
  });

  return tokens;
}
