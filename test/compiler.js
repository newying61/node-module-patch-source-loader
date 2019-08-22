import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';
const createNodeModulePatchSourceLoader = require('../index');

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [createNodeModulePatchSourceLoader('index.js',[
          {
            code: /var toString = \{\}.toString;/g,
            newCode: "var toString = Object.prototype.toString;"
          },
          {
            code: "return toString.call(arr) == '[object Array]';",
            newCode: "return toString.call(arr) === '[object Array]'; // change to use ==="
          }
        ],
        'isarray'
      )]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats);
    });
  });
};