import test from 'ava';
import WhitespaceIgnoreToken from '../src/whitespace-ignore-token';
import { tokenTester } from './util';

test('whitespace token', async t => {
  const { tokens, tts } = await tokenTester(WhitespaceIgnoreToken, [' ', ' ']);
  t.is(tts.lineNumber, 1);
});
