const loaderUtils = require('loader-utils');
const escapeStringRegexp = require('escape-string-regexp');

module.exports.default = function (source) {
  const options = loaderUtils.getOptions(this);
  console.log('Patching: ' + options.packageName + ' ' + options.sourceFileName);

  const patches = options.patches;

  let newSource = source;
  for (let i = 0, j = patches.length; i < j; i++) {
    const patch = patches[i];

    let regex = patch.code;
    if (typeof patch.code === 'string') {
      regex = new RegExp(escapeStringRegexp(patch.code));
    }

    newSource = newSource.replace(regex, patch.newCode);
  }

  console.log(options.packageName + ' ' + options.sourceFileName + ' patched');

  return newSource;
};
