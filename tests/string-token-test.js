import test from 'ava';
import { StringToken } from '../src/string-token';
import { StringChunk } from '../src/string-chunk';

test('string token', t => {
  const chunk = new StringChunk('"abc"');

  const token = StringToken.parse(chunk);
  t.is(token.value, 'abc');
});

test('string token escape', async t => {
  const chunk = new StringChunk('"\\"\\\\\\t"');
  const token = StringToken.parse(chunk);
  t.is(token.value, '"\\\t');
  t.is(chunk.currentLine, 1);
});

test.only('string token over several chunks', async t => {
  const chunk = new StringChunk('"a');
  let token = StringToken.parse(chunk);
  t.is(token, undefined);
  chunk.append('bcd"');

  token = StringToken.parse(chunk);
  t.is(token.value, 'abcd');
  t.is(chunk.currentLine, 1);
});
