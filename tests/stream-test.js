import test from 'ava';
import TokenizerTransformStream from '../src/transform-stream';
import NumberToken from '../src/number-token';

const { createReadStream } = require('fs');
const { join } = require('path');

test.cb('simple pipe', t => {
  t.plan(2);

  const tts = new TokenizerTransformStream([NumberToken]);

  const rs = createReadStream(
    join(__dirname, '..', 'tests', 'fixtures', 'tokens1.txt'),
    { encoding: 'utf8' }
  );

  rs.pipe(tts);

  tts.on('data', token => {
    t.is(token.type, 'number');
    t.is(token.value, 4711);
    //console.log(`Token type: ${token.type}`);

    t.end();
  });
});
