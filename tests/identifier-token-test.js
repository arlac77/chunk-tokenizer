import test from 'ava';
import { IdentifierToken } from '../src/identifier-token';
import { StringChunk } from '../src/string-chunk';

test('identifier token parse fitting chunk', t => {
  const chunk = new StringChunk('abc ');
  const token = IdentifierToken.parse(chunk);
  t.is(token.value, 'abc');
});

test('identifier token parse from several chunks', async t => {
  const chunk = new StringChunk('abc');
  IdentifierToken.parse(chunk);
  chunk.append('def ');
  const token = IdentifierToken.parse(chunk);
  t.is(token.value, 'abcdef');
});
