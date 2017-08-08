import Token from './token';

/**
 *
 */
export class KeywordToken extends Token {
  static register(tokenizer) {
    const value = this.value;
    const firstChar = value[0];
    const maxLength = tokenizer.maxTokenLengthForFirstChar[firstChar] || 0;

    if (maxLength < value.length) {
      tokenizer.maxTokenLengthForFirstChar[firstChar] = value.length;
    }

    tokenizer.registeredTokens[value] = this;
  }

  static parse(pp) {
    pp.offset += this.value.length;
    return new this();
  }

  get type() {
    return 'keyword';
  }
}

export function makeKeywordTokens(baseToken, tokenDefinitions) {
  const tokens = [];

  Object.keys(tokenDefinitions).forEach(key => {
    tokens.push(
      class X extends baseToken {
        static get value() {
          return key;
        }

        get name() {
          return key;
        }

        get value() {
          return this.name;
        }
      }
    );
  });

  return tokens;
}
