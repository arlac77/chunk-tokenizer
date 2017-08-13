import test from 'ava';
import TokenizerTransformStream from '../src/transform-stream';
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

const { createReadStream } = require('fs');
const { join } = require('path');

const expectedTokens = [
  {
    type: 'number',
    value: 4711,
    line: 1,
    pos: 0
  },
  {
    type: 'number',
    value: 0.23,
    line: 1,
    pos: 5
  },
  {
    type: 'number',
    value: 12345.0,
    line: 1,
    pos: 10
  },
  {
    type: 'number',
    value: 12.4e20,
    line: 1,
    pos: 18
  },
  {
    type: 'number',
    value: 0.4e7,
    line: 1,
    pos: 26
  },
  {
    type: 'string',
    value: 'str2',
    line: 2,
    pos: 1
  },
  {
    type: 'string',
    value: 'str3',
    line: 2,
    pos: 7
  },
  {
    type: 'string',
    value: '\b\f\n\r\t"\'A',
    line: 2
  },
  {
    type: 'string',
    value: 'str4',
    line: 2
  },
  {
    type: 'string',
    value: 'str5',
    line: 2
  },
  {
    type: 'identifier',
    value: 'name1',
    line: 3
  },
  {
    type: 'identifier',
    value: 'name_2',
    line: 3
  },
  {
    type: 'keyword',
    value: 'if',
    line: 3
  },
  {
    type: 'identifier',
    value: '_name3',
    line: 3
  },
  {
    type: 'identifier',
    value: 'n',
    line: 4
  },
  {
    type: 'operator',
    value: '+',
    line: 5
  },
  {
    type: 'operator',
    value: '-',
    line: 6
  },
  {
    type: 'operator',
    value: '*',
    line: 7,
    precedence: 42
  },
  {
    type: 'operator',
    value: '/',
    line: 8
  },
  {
    type: 'operator',
    value: '(',
    line: 9
  },
  {
    type: 'operator',
    value: ')',
    line: 9
  },
  {
    type: 'operator',
    value: '{',
    line: 10
  },
  {
    type: 'operator',
    value: '}',
    line: 10
  },
  {
    type: 'operator',
    value: '[',
    line: 11
  },
  {
    type: 'operator',
    value: ']',
    line: 11
  },
  {
    type: 'operator',
    value: ':',
    line: 12
  },
  {
    type: 'operator',
    value: ',',
    line: 12
  },
  {
    type: 'operator',
    value: ';',
    line: 12
  },
  {
    type: 'operator',
    value: '.',
    line: 12
  },
  {
    type: 'operator',
    value: '<',
    line: 13
  },
  {
    type: 'operator',
    value: '===',
    line: 13
  },
  {
    type: 'operator',
    value: '>',
    line: 13
  },
  {
    type: 'operator',
    value: '!===',
    line: 13
    //      pos: 22
  },
  {
    type: 'operator',
    value: '<=',
    line: 14
  },
  {
    type: 'operator',
    value: '>=',
    line: 15
  },
  {
    type: 'operator',
    value: '=',
    line: 16,
    precedence: 77
  },
  {
    type: 'number',
    value: 2,
    line: 17
  },
  {
    type: 'operator',
    value: '+',
    line: 17
  },
  {
    type: 'operator',
    value: '(',
    line: 17
  },
  {
    type: 'number',
    value: 3,
    line: 17
  },
  {
    type: 'operator',
    value: '*',
    line: 17
  },
  {
    type: 'number',
    value: 17,
    line: 17
  },
  {
    type: 'operator',
    value: ')',
    line: 17
  }
];

test.cb('simple pipe', t => {
  t.plan(expectedTokens.length * 2);

  const tts = new TokenizerTransformStream(
    new TokenMatcher([
      WhitespaceIgnoreToken,
      NumberToken,
      StringToken,
      IdentifierToken,
      ...makeKeywordTokens(KeywordToken, { if: {}, else: {} }),
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
    ])
  );

  const rs = createReadStream(
    join(__dirname, '..', 'tests', 'fixtures', 'tokens1.txt'),
    { encoding: 'utf8' }
  );

  rs.pipe(tts);

  const detectedTokens = [];

  tts.on('data', token => {
    const exprectedToken = expectedTokens[detectedTokens.length];

    if (detectedTokens.length === expectedTokens.length) {
      t.end();
      return;
    }

    //console.log(`${token.type} ${exprectedToken.type}`);
    t.is(token.type, exprectedToken.type);
    //t.is(token.lineNumber, exprectedToken.line);
    t.is(
      token.value || token.name,
      exprectedToken.value,
      `${detectedTokens.length}: expecting '${exprectedToken.value}' token`
    );

    /*
    console.log(
      `[${detectedTokens.length}] ${token.type} ${token.value ||
        token.name} : ${exprectedToken.value}`
    );
*/
    detectedTokens.push(token);
  });
});
