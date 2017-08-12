import test from 'ava';

import TokenMatcher from '../src/token-matcher';
import NumberToken from '../src/number-token';
import StringToken from '../src/string-token';
import IdentifierToken from '../src/identifier-token';
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
    IdentifierToken,
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

  t.is(tm.maxTokenLengthForFirstChar['-'], 1);
  t.is(tm.maxTokenLengthForFirstChar['='], 3);
  t.is(tm.maxTokenLengthForFirstChar['0'], 1);
});
