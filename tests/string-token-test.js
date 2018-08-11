import test from 'ava';
import { StringToken } from '../src/string-token';
import { StringChunk } from '../src/string-chunk';

test.only('string token', t => {
  const chunk = new StringChunk('"abc"');

  const token = StringToken.parse(chunk);
  t.is(token.value, 'abc');
});

test('string token escape', async t => {
  const { tokens, tts } = await tokenTester(StringToken, ['"\\\\"']);
  t.is(tokens[0].value, '\\');
  t.is(tts.lineNumber, 1);
});

test.skip('string token over several chunks', async t => {
  const { tokens, tts } = await tokenTester(StringToken, ['"A', 'B"']);

  t.is(tokens[0].value, 'AB');
  t.is(tts.lineNumber, 1);
});
