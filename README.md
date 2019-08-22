# node-module-patch-source-loader
Patch node module source code during webpack compiling time.

Sometimes, when you find an issue in node module package A, but in fact the root is in its dependency package B.

To fix the issue, you need to raise a pull request to package B and then hope package A can be re-published using the new version of package B.

Or you can use yarn resolutions to force package A to use the new version package B.

Anyway, this may take some time.

For a qiuck patch, you can use this source loader to replace package B source code during webpack compiling time.

## Install
Use `npm install node-module-patch-source-loader --save-dev` or `yarn add node-module-patch-source-loader --dev`.

## How to use
In webpack.config.js file, add a new loader:

```js
    const createNodeModulePatchSourceLoader = require('node-module-patch-source-loader');

    ...
    module: {
        rules: [
            createNodeModulePatchSourceLoader('source-code.esm.js', [
              {
                code: /var current = node\.parentNode;/g,
                newCode: 'var current = node && node.parentNode;'
              }
              {
                code: 'var target = event.target;',
                newCode: 'var target = (event.composedPath && event.composedPath().shift()) || event.target;'
              }
            ], 'node-module-package-name'),
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
  ...
```
The code, which matches the conditions in the array in node_moudles 'node-module-package-name' package 'source-code.esm.js' file, will be replaced by the newCode.

You have to know the source code file name in the package.

The replacement of the code needs to follow this format:
{
  code: the code to be replaced or RegEx of the code to be replaced,
  newCode: The new code that will be used
}
