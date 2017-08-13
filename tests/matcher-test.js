import test from 'ava';

import TokenMatcher from '../src/token-matcher';
import NumberToken from '../src/number-token';
import StringToken from '../src/string-token';
import { IdentifierToken, makeIdentifierTokens } from '../src/identifier-token';
import {
  makeOperatorTokens,
  OperatorToken,
  InfixOperatorToken,
  PrefixOperatorToken
} from '../src/operator-token';
import WhitespaceIgnoreToken from '../src/whitespace-ignore-token';

test('matcher', t => {
  const tm = new TokenMatcher([
    WhitespaceIgnoreToken,
    NumberToken,
    StringToken,
    ...makeIdentifierTokens(IdentifierToken, { if: {}, else: {} }),
    ...makeOperatorTokens(OperatorToken, {
      '=': {
        precedence: 77
      },
      '+': {},
      '-': {},
      '*': {
        precedence: 42
      },
      '/': {},
      '(': {},
      ')': {},
      '[': {},
      ']': {},
      '{': {},
      '}': {},
      ':': {},
      '<': {},
      '>': {},
      '.': {},
      ',': {},
      ';': {},
      '<=': {},
      '>=': {},
      '=>': {},
      '===': {},
      '!===': {}
    })
  ]);

  t.is(tm.maxTokenLengthForFirstChar.get('-'), 1);
  t.is(tm.maxTokenLengthForFirstChar.get('='), 3);
  t.is(tm.maxTokenLengthForFirstChar.get('0'), 1);
  t.is(tm.maxTokenLengthForFirstChar.get('!'), 4);
});
