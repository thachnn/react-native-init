# React Native app creating CLI

React Native projects initializing CLI, that has been extracted from the official [`@react-native-community/cli`](https://github.com/react-native-community/cli) package.

> This CLI is independent of `react-native` and `@react-native-community/cli`, it just process React Native templates only.

## Usage (with `npx`)

```sh
npx react-native-init [options] <projectName>
```

Initialize a new React Native project named `<projectName>` in a directory of the same name.

> If you have both `yarn` and `npm` installed, this CLI will always try to use `yarn`. You can force usage of `npm` by adding `--npm` flag to the command.

### Options

#### `--version <string>`

Shortcut for `--template react-native@version`.

#### `--directory <string>`

Uses a custom directory instead of `<projectName>`.

#### `--title <string>`

Uses a custom app title instead of `<projectName>`.

#### `--skip-install`

Skip dependencies installation

#### `--npm`

Force use of npm during initialization

#### `--template <string>`

Uses a custom template. It should point to a valid package that can be installed with `yarn` or `npm`.

The most common options are:

- Full `npm` package name
- Absolute path to directory containing template
- Absolute path to a package tarball created using `npm pack`
- Link to a `GitHub` repository (supports `username/repo#branch` format)

Example:

```sh
npx react-native-init MyApp --template react-native-template-typescript@6.12.10
npx react-native-init MyApp --template file:///Users/name/template-path
npx react-native-init MyApp --template file:///Users/name/template-name-1.0.0.tgz
npx react-native-init MyApp --template thachnn/react-native-template#v0.71.4
```

A template is any directory or npm package that contains a `template.config.js` file in the root:

```js
module.exports = {
  // Placeholder used to rename and replace in files package.json, index.json, android/, ios/
  placeholderName: 'ProjectName',
  // Placeholder used to rename app title inside values.xml and Info.plist
  titlePlaceholder: 'Project Display Name',
  // Directory with the template which will be copied and processed by this CLI
  templateDir: './template',
  // Path to script, which will be executed after initialization process
  postInitScript: './script.js',
};
```

> You can find example custom template [here](https://github.com/Esemesek/react-native-new-template).

## License

Everything inside this repository is [MIT licensed](./LICENSE).
