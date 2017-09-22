/**
 * Holds a Set of tokens and identifies them based on the longest matching character string
 */
export default class TokenMatcher {
  /**
   * @param tokens
   */
  constructor(tokens) {
    Object.defineProperty(this, 'tokens', { value: tokens });

    Object.defineProperty(this, 'maxTokenLengthForFirstChar', {
      value: new Map()
    });
    Object.defineProperty(this, 'registeredTokens', {
      value: new Map()
    });

    for (const t of tokens) {
      t.register(this);
    }
  }

  registerToken(key, token) {
    const firstChar = key[0];
    const maxLength = this.maxTokenLengthForFirstChar.get(firstChar) || 0;

    if (maxLength < key.length) {
      this.maxTokenLengthForFirstChar.set(firstChar, key.length);
    }

    this.registeredTokens.set(key, token);
  }
}
