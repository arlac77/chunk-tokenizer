import test from 'ava';
import StringToken from '../src/string-token';
import { tokenTester } from './util';

test('string token', async t => {
  const { tokens, tts } = await tokenTester(StringToken, ['"A"', '"B"']);

  t.is(tokens[0].value, 'A');
  t.is(tokens[1].value, 'B');
  t.is(tts.lineNumber, 1);
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
