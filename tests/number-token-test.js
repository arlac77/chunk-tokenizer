import test from 'ava';
import NumberToken from '../src/number-token';
import { tokenTester } from './util';

test('number token', async t => {
  const { tokens, tts } = await tokenTester(NumberToken, ['17']);

  t.is(tokens[0].value, 17);
  t.is(tts.lineNumber, 1);
});

test.skip('number token over several chunks', async t => {
  const { tokens, tts } = await tokenTester(NumberToken, ['17', '2']);

  t.is(tokens[0].value, 172);
  t.is(tts.lineNumber, 1);
});
