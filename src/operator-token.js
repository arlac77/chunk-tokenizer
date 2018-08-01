import { Token } from './token';

export class OperatorToken extends Token {
  static get value() {
    return '';
  }

  static register(tokenizer) {
    const p = tokenizer.registeredTokens.get(this.value);
    if (p !== undefined) {
      this.nud = p.nud;
    }

    tokenizer.registerToken(this.value, this);
  }

  static parse(chunk) {
    chunk.position += this.value.length;
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

/**
 * Creates a new token class for each token definition.
 * @param baseToken {OperatorToken}
 * @param tokenDefinitions {Object} keys are the operator names
 * @return {OpearatorToken []} newly created OperatorToken classes
 */
export function makeOperatorTokens(baseToken, tokenDefinitions) {
  const tokens = [];

  Object.keys(tokenDefinitions).forEach(key => {
    tokens.push(
      class OpearatorToken extends baseToken {
        static get value() {
          return key;
        }
        static get length() {
          return key.length;
        }
      }
    );
  });

  return tokens;
}
