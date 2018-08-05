import test from 'ava';
import { TokenizerTransformStream } from '../src/transform-stream';
import { TokenMatcher } from '../src/token-matcher';
import { KeywordToken, makeKeywordTokens } from '../src/keyword-token';
import { WhitespaceIgnoreToken } from '../src/whitespace-ignore-token';
import { tokenTester } from './util';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StringChunk } from '../src/string-chunk';

const split = require('split');

const keywords = {};

const KEYWORDS_FILE_NAME = join(
  __dirname,
  '..',
  'tests',
  'fixtures',
  'sqlite-keywords.txt'
);

async function makeTokenizer() {
  return new Promise((resolve, reject) => {
    const rs = createReadStream(KEYWORDS_FILE_NAME, { encoding: 'utf8' });

    rs.pipe(split())
      .on('data', line => (keywords[line] = {}))
      .on('end', () => {
        const tts = new TokenizerTransformStream(
          new TokenMatcher([
            WhitespaceIgnoreToken,
            ...makeKeywordTokens(keywords)
          ])
        );
        resolve(tts);
      });
  });
}

test('simple keyword pipe', async t => {
  const rs = createReadStream(KEYWORDS_FILE_NAME, { encoding: 'utf8' });

  const tts = await makeTokenizer();
  rs.pipe(tts);

  tts.on('data', token => {
    t.is(token.type, 'keyword');
    t.truthy(keywords[token.value]);
  });

  return new Promise((resolve, reject) => {
    tts.on('end', () => resolve());
  });
});

test('keyword token', t => {
  const tokens = makeKeywordTokens(['function']);

  t.is(tokens.length, 1);

  const kw = tokens[0];

  //const kwi = new kw();
  //t.is(kw.type, 'keyword');
  t.is(kw.value, 'function');
  t.is(kw.length, 7);
});

test('keyword token parse', async t => {
  const KWToken = makeKeywordTokens(['function'])[0];
  const chunk = new StringChunk('function');
  const token = KWToken.parse(chunk);
  t.is(token.value, 'function');
});

test('keyword token several chunks', async t => {
  const KWToken = makeKeywordTokens(['function'])[0];
  let token;

  const chunk = new StringChunk('funct');
  token = KWToken.parse(chunk);
  t.is(token, undefined);
  chunk.append('ion ');
  token = KWToken.parse(chunk);
  t.is(token.value, 'function');
});
