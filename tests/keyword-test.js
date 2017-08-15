import test from 'ava';
import TokenizerTransformStream from '../src/transform-stream';
import TokenMatcher from '../src/token-matcher';
import { KeywordToken, makeKeywordTokens } from '../src/keyword-token';
import WhitespaceIgnoreToken from '../src/whitespace-ignore-token';

const { createReadStream } = require('fs');
const { join } = require('path');
const split = require('split');

async function makeTokenizer() {
  return new Promise((fullfill, reject) => {
    const rs = createReadStream(
      join(__dirname, '..', 'tests', 'fixtures', 'sqlite-keywords.txt'),
      { encoding: 'utf8' }
    );

    const keywords = {};

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
  });

  return new Promise((fullfill, reject) => {
    tts.on('end', () => {
      fullfill();
    });
  });
});
