'use strict';

const [targetNode] = /\d+(\.\d+)?/.exec(
  require('./package.json').engines.node, //
);

module.exports = {
  overrides: [
    {
      presets: ['@babel/preset-typescript'],
      test: '**/*.ts',
    },
    {
      plugins: ['@babel/preset-env/plugins/transform-modules-commonjs'],
      test: './node_modules/**/*.js',
    },
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {node: targetNode},
        modules: false, //
      },
    ],
  ],
};
