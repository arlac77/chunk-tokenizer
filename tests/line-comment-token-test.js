import test from 'ava';
import { LineCommentToken } from '../src/line-comment-token';
import { StringChunk } from '../src/string-chunk';

test('line comment token', t => {
  const chunk = new StringChunk(' \n\t ');
  const token = LineCommentToken.parse(chunk);
  t.is(token, undefined);

  t.is(chunk.currentLine, 2);
  t.is(chunk.position, 3);
});
