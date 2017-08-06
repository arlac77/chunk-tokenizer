import test from 'ava';
import TokenizerTransformStream from '../src/stream';

const { createReadStream } = require('fs');
const { join } = require('path');

test('simple pipe', t => {
  const tts = new TokenizerTransformStream();
  const rs = createReadStream(
    join(__dirname, '..', 'tests', 'fixtures', 'tokens.txt')
  );
  rs.pipe(tts);

  tts.on('data', chunk => {});
});
