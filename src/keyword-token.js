import Token from './token';

/**
 *
 */
export class KeywordToken extends Token {
  static register(tokenizer) {
    tokenizer.registerToken(this.value, this);
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
