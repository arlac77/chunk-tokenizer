import EOFToken from './eof-token';

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
  constructor(matcher) {
    super({ objectMode: true });

    Object.defineProperty(this, 'matcher', {
      value: matcher
    });
  }

  error(s, pp, c) {
    console.log(`${s} ${c}`);
  }

  _transform(chunk, encoding, callback) {
    const pp = Object.create(rootPP);
    pp.chunk = chunk;
    pp.tokenizer = this;

    const matcher = this.matcher;

    do {
      const c = pp.chunk[pp.offset];
      let tokenLength = matcher.maxTokenLengthForFirstChar[c];

      //console.log(`${c} -> ${tokenLength}`);

      if (tokenLength > 0) {
        do {
          const t =
            matcher.registeredTokens[
              pp.chunk.substring(pp.offset, pp.offset + tokenLength)
            ];

          if (t !== undefined) {
            const rt = t.parse(pp);

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

        pp.offset += 1;

        this.error('Unknown char', pp, c);
      }
    } while (true);

    callback();
  }
}
