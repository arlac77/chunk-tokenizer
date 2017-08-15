import Token from './token';

/**
 *
 */
export class KeywordToken extends Token {
  static register(tokenizer) {
    const value = this.value;
    const firstChar = value[0];
    const maxLength = tokenizer.maxTokenLengthForFirstChar.get(firstChar) || 0;

    if (maxLength < value.length) {
      tokenizer.maxTokenLengthForFirstChar.set(firstChar, value.length);
    }

    tokenizer.registeredTokens.set(value, this);
  }

  static parse(tokenizer) {
    tokenizer.chunkOffset += this.value.length;
    return new this();
  }

  get type() {
    return 'keyword';
  }

  get value() {
    return this.constructor.value;
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
      }
    );
  });

  return tokens;
}
