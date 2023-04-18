#!/usr/bin/env node
'use strict';

const path = require('path');
const webpack = require('webpack');

const baseDir = path.resolve(__dirname, '../');
const [targetNode] = /\d+(\.\d+)?/.exec(
  require('../package.json').engines.node,
);

const resolveDepPath = (file) => path.resolve(baseDir, 'node_modules', file);
const resolvePkgPath = (file) => path.resolve(baseDir, 'packages', file);

const compiler = webpack({
  mode: 'production',
  context: baseDir,
  entry: {index: './packages/cli/src/bin'},
  output: {
    path: path.join(baseDir, 'build'),
    clean: true,
  },
  target: `node${targetNode}`,
  node: {__filename: false, __dirname: false},
  module: {
    rules: [
      // transpile ES
      {
        test: /\.(ts|[cm]?js)$/i,
        include: [
          path.join(baseDir, 'packages'),
          /node_modules[\\/](commander|color-convert|prompts)\b/,
        ],
        loader: 'babel-loader',
        options: {cacheDirectory: true},
      },
      {
        test: /\.(ts|mjs)$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          multiple: [
            {
              search: /^import (\{[^{}]*\} from '@react[-\w]+\/cli-types)\b/gm,
              replace: 'import type $1',
            },
            {
              search: /^import (\{[^{}]*\}) from ('[^.@][^']*')/gm,
              replace: (_, p1, p2) =>
                `const ${p1.replace(/ as /g, ': ')} = require(${p2})`,
            },
            {
              search:
                /^import (?:\* as )?(\w+)(, \{[^{}]*\})? from ('[^.@][^']*')/gm,
              replace: (_, p1, p2, p3) =>
                (!p2 ? '' : `import type ${p2.substring(1)} from ${p3};\n`) +
                `const ${p1} = require(${p3})`,
            },
          ],
        },
      },
      // patches
      {
        test: /packages[\\/]cli\b.src\b.(commands\b.init.template)\.ts$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          search: /\brequire(\.resolve\b|\(\w+)/g,
          replace: '__non_webpack_require__$1',
        },
      },
      {
        test: /\.js$/i, // ES5
        include: [
          /node_modules[\\/](graceful|wcwidth|inherits|isexe|signal)\b/,
          /node_modules[\\/](end|once|pump|semver|sudo|which|wrappy)\b/,
        ],
        loader: 'webpack/lib/replace-loader',
        options: {search: /^(?!\s*['"]use strict)/, replace: "'use strict'\n"},
      },
      {
        test: /node_modules[\\/](bl\b.bl|readable-stream\b.lib._\w+)\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          multiple: [
            {search: /( require\(['"]string_decoder)\//g, replace: '$1'},
            {search: /\b(require\(')(inherits)('\))/g, replace: '$1util$3.$2'},
          ],
        },
      },
      // optimize output
      {
        test: /node_modules[\\/]fs-extra\b.lib.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {search: /^ *require\('\.\/(?!fs|remove)/gm, replace: '//$&'},
      },
      {
        test: /node_modules[\\/]find-up\b.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {search: /^(const|[\w.]+ =) pathExists\b/gm, replace: '//$&'},
      },
      {
        test: /node_modules[\\/]wcwidth\b.index\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          multiple: [
            {search: /^var \w+ = require\('defaults\b/m, replace: '//$&'},
            {search: /^(module\.exports\.)(\w+ =)/m, replace: '//$1\n var $2'},
          ],
        },
      },
      {
        test: /node_modules[\\/]prompts\b.lib\b.prompts\.js$/i,
        loader: 'webpack/lib/replace-loader',
        options: {
          multiple: [
            {
              search: /= (require\('\.\/elements)('\))/,
              replace: '= { SelectPrompt: $1/select$2 }',
            },
            {search: /^\$\.(?!select\b)(\w+ =)/gm, replace: 'const $1'},
          ],
        },
      },
      //
    ],
  },
  resolve: {
    extensions: ['.ts', '...'],
    alias: ['types', 'tools', 'doctor'].reduce(
      (o, x) => {
        o[`@react-native-community/cli-${x}`] = resolvePkgPath(`cli-${x}/src`);
        return o;
      },
      {
        commander$: resolveDepPath('commander/lib/command.js'),
        prompts$: resolveDepPath('prompts/lib/index.js'),
      },
    ),
  },
  plugins: [
    new webpack.CopyPlugin({
      patterns: [
        {from: '{LICENSE*,README*}', context: '.'},
        {
          from: 'package.json',
          transform(content) {
            const pkg = JSON.parse(
              String(content).replace(/,\s*"private":[\s\S]*/, '}'),
            );
            pkg.version = require('../packages/cli/package.json').version;
            return JSON.stringify(pkg, null, 2) + '\n';
          },
        },
      ],
    }),
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
  ],
  optimization: {
    nodeEnv: false,
    // minimize: false,
    minimizer: [
      new webpack.TerserPlugin({
        terserOptions: {
          mangle: false,
          format: {beautify: true, indent_level: 2},
        },
        extractComments: {condition: 'some', banner: false},
      }),
    ],
  },
});

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  const extra = {nestedModules: true, nestedModulesSpace: Infinity};
  console.log(stats.toString({colors: true, modulesSpace: Infinity, ...extra}));
});
