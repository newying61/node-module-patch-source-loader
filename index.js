const path = require("path");
const escapeStringRegexp = require('escape-string-regexp');

module.exports = function createNodeModulePatchSourceLoader(sourceFileName, patches, packageName) {
  return {
    test: new RegExp(escapeStringRegexp(sourceFileName)),
    use: {
      loader: path.resolve(__dirname, './loader.js'),
      options: {
        patches: patches,
        packageName: packageName,
        sourceFileName: sourceFileName
      }
    },
    include: [new RegExp('node_modules/' + packageName)]
  }
};