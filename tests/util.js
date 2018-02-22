import { TokenizerTransformStream } from '../src/transform-stream';
import { TokenMatcher } from '../src/token-matcher';

export function tokenTester(token, chunks) {
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
