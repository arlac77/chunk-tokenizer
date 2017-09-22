import test from 'ava';

import TokenMatcher from '../src/token-matcher';
import NumberToken from '../src/number-token';
import StringToken from '../src/string-token';
import { KeywordToken, makeKeywordTokens } from '../src/keyword-token';
import { IdentifierToken } from '../src/identifier-token';
import {
  makeOperatorTokens,
  OperatorToken,
  InfixOperatorToken,
  PrefixOperatorToken
} from '../src/operator-token';
import WhitespaceIgnoreToken from '../src/whitespace-ignore-token';

test.only('matcher', t => {
  const tm = new TokenMatcher([
    WhitespaceIgnoreToken,
    NumberToken,
    StringToken,
    IdentifierToken,
    ...makeKeywordTokens(KeywordToken, { if: {}, else: {}, end: {} }),
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

  t.is(tm.maxTokenLengthForFirstChar.get('i'), 2);
  t.is(tm.maxTokenLengthForFirstChar.get('e'), 4);
  t.is(tm.maxTokenLengthForFirstChar.get('-'), 1);
  t.is(tm.maxTokenLengthForFirstChar.get('='), 3);
  t.is(tm.maxTokenLengthForFirstChar.get('0'), 1);
  t.is(tm.maxTokenLengthForFirstChar.get('!'), 4);
});
