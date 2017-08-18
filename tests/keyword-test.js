import test from 'ava';
import TokenizerTransformStream from '../src/transform-stream';
import TokenMatcher from '../src/token-matcher';
import { KeywordToken, makeKeywordTokens } from '../src/keyword-token';
import WhitespaceIgnoreToken from '../src/whitespace-ignore-token';
import { tokenTester } from './util';

const { createReadStream } = require('fs');
const { join } = require('path');
const split = require('split');

const keywords = {};

async function makeTokenizer() {
  return new Promise((fullfill, reject) => {
    const rs = createReadStream(
      join(__dirname, '..', 'tests', 'fixtures', 'sqlite-keywords.txt'),
      { encoding: 'utf8' }
    );

    rs.pipe(split()).on('data', line => (keywords[line] = {})).on('end', () => {
      const tts = new TokenizerTransformStream(
        new TokenMatcher([
          WhitespaceIgnoreToken,
          ...makeKeywordTokens(KeywordToken, keywords)
        ])
      );
      fullfill(tts);
    });
  });
}

test('simple pipe', async t => {
  const rs = createReadStream(
    join(__dirname, '..', 'tests', 'fixtures', 'sqlite-keywords.txt'),
    { encoding: 'utf8' }
  );

  const tts = await makeTokenizer();
  rs.pipe(tts);

  tts.on('data', token => {
    t.is(token.type, 'keyword');
    t.truthy(keywords[token.value]);
  });

  return new Promise((fullfill, reject) => {
    tts.on('end', () => {
      fullfill();
    });
  });
});

test.skip('keyword token several chunks', async t => {
  const { tokens, tts } = await tokenTester(
    makeKeywordTokens(KeywordToken, ['function'])[0],
    ['funct', 'ion ']
  );
  t.is(tokens[0].value, 'function');
});
