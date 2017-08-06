import test from 'ava';
import TokenizerTransformStream from '../src/stream';

const { createReadStream } = require('fs');
const { join } = require('path');

test.cb('simple pipe', t => {
  t.plan(1);

  const tts = new TokenizerTransformStream();
  const rs = createReadStream(
    join(__dirname, '..', 'tests', 'fixtures', 'tokens1.txt')
  );
  rs.pipe(tts);

  tts.on('data', chunk => {
    t.pass();
    t.end();
  });
});
