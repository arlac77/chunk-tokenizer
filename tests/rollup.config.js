import multiEntry from 'rollup-plugin-multi-entry';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import istanbul from 'rollup-plugin-istanbul';

export default {
  input: 'tests/**/*-test.js',
  external: ['ava', 'fs', 'path'],

  plugins: [
    multiEntry(),
    resolve(),
    commonjs(),
    istanbul({
      exclude: ['tests/**/*-test.js', 'node_modules/**/*']
    })
  ],

  output: {
    file: 'build/bundle-test.js',
    format: 'cjs',
    sourcemap: true,
    interop: false
  }
};
