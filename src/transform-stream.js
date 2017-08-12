import EOFToken from './eof-token';

const { Transform } = require('stream');

/*
const rootPP = {
  chunk: undefined,
  context: {},
  firstCharInLine: 0,
  lineNumber: 1,
  offset: 0,
  get positionInLine() {
    return this.offset - this.firstCharInLine;
  },
  get properties() {
    return {
      lineNumber: {
        value: this.lineNumber
      },
      positionInLine: {
        value: this.positionInLine
      }
    };
  }
};
*/

export default class TokenizerTransformStream extends Transform {
  constructor(matcher) {
    super({ objectMode: true });

    Object.defineProperty(this, 'matcher', {
      value: matcher
    });

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
    this.chunk = chunk;

    const matcher = this.matcher;

    do {
      const c = chunk[this.chunkOffset];
      let tokenLength = matcher.maxTokenLengthForFirstChar[c];

      //console.log(`${c} -> ${tokenLength}`);

      if (tokenLength > 0) {
        do {
          const t =
            matcher.registeredTokens[
              chunk.substring(this.chunkOffset, this.chunkOffset + tokenLength)
            ];

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
          this.push(EOFToken);
          break;
        }

        this.chunkOffset += 1;

        this.error('Unknown char', c);
      }
    } while (true);

    callback();
  }
}
