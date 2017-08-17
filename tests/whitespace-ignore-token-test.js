import test from 'ava';
import WhitespaceIgnoreToken from '../src/whitespace-ignore-token';
import { tokenTester } from './util';

test('whitespace token', async t => {
  const { tokens, tts } = await tokenTester(WhitespaceIgnoreToken, [
    ' ',
    '\n',
    ' '
  ]);
  t.is(tts.lineNumber, 2);
});
