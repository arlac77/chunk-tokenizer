import test from 'ava';
import TokenizerTransformStream from '../src/transform-stream';
import TokenMatcher from '../src/token-matcher';
import StringToken from '../src/string-token';

function tokenTester(token, chunks) {
  const tts = new TokenizerTransformStream(new TokenMatcher([token]));

  const tokens = [];

  tts.on('data', token => tokens.push(token));

  return new Promise((fullfill, reject) => {
    let chunkIndex = 0;

    function next() {
      tts._transform(chunks[chunkIndex++], undefined, error => {
        if (error) {
          reject(error);
          return;
        }

        if (chunkIndex >= chunks.length) {
          fullfill({ tts, tokens });
        } else {
          next();
        }
      });
    }

    next();
  });
}

test('string token', async t => {
  const { tokens, tts } = await tokenTester(StringToken, ['"A"', '"B"']);

  t.is(tokens[0].value, 'A');
  t.is(tokens[1].value, 'B');
  t.is(tts.lineNumber, 1);
});

test.skip('string token over several chunks', async t => {
  const { tokens, tts } = await tokenTester(StringToken, ['"A', 'B"']);

  t.is(tokens[0].value, 'AB');
  t.is(tts.lineNumber, 1);
});
