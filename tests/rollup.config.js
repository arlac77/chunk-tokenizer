import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  external: ['ava', 'fs', 'path'],

  plugins: [multiEntry()],

  output: {
    file: 'build/bundle-test.js',
    format: 'cjs',
    sourcemap: true
  }
};
