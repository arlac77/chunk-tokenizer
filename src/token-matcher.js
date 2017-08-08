export default class TokenMatcher {
  constructor(tokens) {
    Object.defineProperty(this, 'tokens', { value: tokens });

    const maxTokenLengthForFirstChar = {};
    const registeredTokens = {};

    Object.defineProperty(this, 'maxTokenLengthForFirstChar', {
      value: maxTokenLengthForFirstChar
    });
    Object.defineProperty(this, 'registeredTokens', {
      value: registeredTokens
    });

    for (const t of tokens) {
      t.register(this);
    }
  }
}
