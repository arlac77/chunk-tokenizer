import Token from './token';
import NumberToken from './number-token';

const { Transform } = require('stream');

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

export default class TokenizerTransformStream extends Transform {
  constructor(tokens) {
    super({ objectMode: true });
    Object.defineProperty(this, 'tokens', { value: tokens });
  }

  _transform(chunk, encoding, callback) {
    const pp = Object.create(rootPP);
    pp.chunk = chunk;
    pp.tokenizer = this;

    const lastOffset = pp.offset;

    do {
      for (const t of this.tokens) {
        const ti = t.parse(pp);
        if (ti !== undefined) {
          this.push(ti);
          break;
        }
      }
    } while (chunk.offset !== lastOffset);

    callback();
  }
}
