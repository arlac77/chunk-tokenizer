export default class TokenMatcher {
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
}
