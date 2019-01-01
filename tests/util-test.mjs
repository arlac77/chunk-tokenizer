import test from 'ava';
import { characterSetFromString } from '../src/util';

test('characterSetFromString', t => {
  t.deepEqual(characterSetFromString('ABC'), new Set([65, 66, 67]));
});
