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

/**
 * Creates a new token class for each token definition.
 * @param {KeywordToken} baseToken
 * @param {Object} tokenDefinitions keys are the operator names
 * @return {KeywordToken []} newly created KeywordToken classes
 */
export function makeKeywordTokens(baseToken, tokenDefinitions) {
  const tokens = [];

  Object.keys(tokenDefinitions).forEach(key => {
    tokens.push(
      class KeywordToken extends baseToken {
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
