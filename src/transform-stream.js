import { Transform } from 'stream';
import { StringChunk } from './string-chunk';

export class TokenizerTransformStream extends Transform {
  constructor(matcher) {
    super({ objectMode: true });

    Object.defineProperty(this, 'matcher', {
      value: matcher
    });

    this.chunk = new StringChunk();
  }

  error(s, c) {
    console.log(`${s} '${c}'`);
  }

  _transform(chunk, encoding, callback) {
    this.chunk.append(chunk);

    const matcher = this.matcher;

    do {
      const c = chunk[this.chunkOffset];
      let tokenLength = matcher.maxTokenLengthForFirstChar.get(c);

      //console.log(`${c} -> ${tokenLength}`);

      if (tokenLength > 0) {
        do {
          const t = matcher.registeredTokens.get(
            chunk.substring(this.chunkOffset, this.chunkOffset + tokenLength)
          );

          if (t !== undefined) {
            const rt = t.parse(this, this.partialTokenState);

            //console.log(`${c} : ${t.name} ${rt ? rt.value : 'null'}`);

            if (rt !== undefined) {
              this.partialTokenState = undefined;
              this.push(rt);
            }
            break;
          }
        } while (tokenLength-- > 1);
      } else {
        if (c === undefined) {
          break;
        }

        this.chunkOffset += 1;

        this.error('Unknown char', c);
      }
    } while (true);

    callback();
  }
}
