import test from 'ava';
import { StringChunk } from '../src/string-chunk';

test('empty chunk', async t => {
  const chunk = new StringChunk();
  t.is(chunk.currentLine, 1);
});

test.only('append chunk', async t => {
  const chunk = new StringChunk();

  const append1 = '1234';
  chunk.append(append1);

  let i = 0;
  for (const c of chunk) {
    t.is(append1.charCodeAt(i), c);
    i++;
  }

  for (const c of chunk) {
  }

  chunk.append(append1);
  i = 0;
  for (const c of chunk) {
    t.is(append1.charCodeAt(i), c);
    i++;
  }
});
