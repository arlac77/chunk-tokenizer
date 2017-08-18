import test from 'ava';
import { OperatorToken, makeOperatorTokens } from '../src/operator-token';
import { tokenTester } from './util';

test('operator token', async t => {
  const { tokens, tts } = await tokenTester(
    makeOperatorTokens(OperatorToken, {
      '=': {}
    })[0],
    ['=']
  );

  t.is(tokens[0].value, '=');
  t.is(tts.lineNumber, 1);
});

test.skip('operator token over several chunks', async t => {
  const { tokens, tts } = await tokenTester(
    makeOperatorTokens(OperatorToken, {
      '==': {}
    })[0],
    ['=', '=']
  );

  t.is(tokens[0].value, '==');
  t.is(tts.lineNumber, 1);
});
