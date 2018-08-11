import test from 'ava';
import { OperatorToken, makeOperatorTokens } from '../src/operator-token';
import { StringChunk } from '../src/string-chunk';

test('operator token', t => {
  const chunk = new StringChunk('=');

  const T = makeOperatorTokens(OperatorToken, {
    '=': {}
  })[0];

  const token = T.parse(chunk);

  t.is(token.value, '=');
  t.is(chunk.currentLine, 1);
});

test.only('operator token over several chunks', async t => {
  const T = makeOperatorTokens(OperatorToken, {
    '==': {}
  })[0];

  const chunk = new StringChunk('=');

  let token = T.parse(chunk);
  t.is(token, undefined);
  chunk.append('= ');
  token = T.parse(chunk);
  t.is(token.value, '==');
  t.is(chunk.currentLine, 1);
});
