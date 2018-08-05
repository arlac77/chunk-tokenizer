import { createReadStream } from 'fs';
import toReadableStream from 'to-readable-stream';
import { join, basename } from 'path';
import { URL } from 'url';
import { StringChunk } from './string-chunk';

async function* chunker(stream) {
  const chunk = new StringChunk();

  for await (const buffer of stream) {
    chunk.append(buffer);

    do {
      const token = IdentifierTokenizer(chunk);
      if (token === undefined) {
        break;
      }
      yield token;
    } while (true);
  }
}

function IdentifierTokenizer(chunk) {
  chunk.markPosition();
  for (const c of chunk) {
    if (c >= 65 && c <= 65 + 26) {
    } else {
      return chunk.extractFromMarkedPosition();
    }
  }
}

const fixtures = join(
  basename(new URL(import.meta.url).pathname),
  '..',
  'tests',
  'fixtures'
);

const keywords = ['ABORT', 'ACTION', 'ADD', 'AFTER', 'ALL'];

async function test() {
  let n = 0;

  const stream = fakeStream(['AB', 'ORT ACTION ADD AFTER', 'ALL']);

  /*
  const stream = createReadStream(join(fixtures, 'sqlite-keywords.txt'), {
    encoding: 'UTF8'
  });*/

  for await (const token of chunker(stream)) {
    console.log(`${n}: '${token}'`);
    if (n < keywords.length) {
      if (keywords[n] !== token) {
        console.log(`'${token}' <> ${keywords[n]}`);
      }
      n++;
    }
  }
}

/*
async function test2() {
  for await (const token of CharacterTokenizer(toReadableStream('A B C'))) {
    console.log(token);
  }
}
*/

test();

async function* fakeStream(chunks) {
  for (const chunk of chunks) {
    yield chunk;
  }
}
