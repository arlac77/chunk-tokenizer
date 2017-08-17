import test from 'ava';
import { IdentifierToken } from '../src/identifier-token';
import { tokenTester } from './util';

test('identifier token', async t => {
  const { tokens, tts } = await tokenTester(IdentifierToken, ['abc']);
  t.is(tokens[0].value, 'abc');
});

test.skip('identifier token several chunks', async t => {
  const { tokens, tts } = await tokenTester(IdentifierToken, ['abc', 'def ']);
  t.is(tokens[0].value, 'abcdef');
});
