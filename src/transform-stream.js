import EOFToken from './eof-token';

const { Transform } = require('stream');

export default class TokenizerTransformStream extends Transform {
  constructor(matcher) {
    super({ objectMode: true });

    Object.defineProperty(this, 'matcher', {
      value: matcher
    });

    this.chunk = '';
    this.chunkOffset = 0;
    this.lineNumber = 1;
    this.firstCharInLine = 0;
  }

  newLine() {
    this.lineNumber += 1;
    this.firstCharInLine = this.chunkOffset;
  }

  get positionInLine() {
    return this.chunkOffset - this.firstCharInLine;
  }

  error(s, c) {
    console.log(`${s} ${c}`);
  }

  _transform(chunk, encoding, callback) {
    const oldChunk = this.chunk;
    //console.log(`${oldChunk.length} ${this.chunkOffset} ${chunk.length}`);
    this.chunk = oldChunk.substring(this.chunkOffset, oldChunk.length) + chunk;
    chunk = this.chunk;
    this.chunkOffset = 0;

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
            const rt = t.parse(this);

            //console.log(`${c} : ${t.name} ${rt ? rt.value : 'null'}`);

            if (rt !== undefined) {
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
