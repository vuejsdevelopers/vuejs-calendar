const webpack = require("webpack");
const webpackConfig = require('./webpack.config').find(item => item.target === 'node');
const path = require('path');
const MFS = require('memory-fs');

module.exports = {
  init(bundleUpdated) {
    const compiler = webpack(webpackConfig);
    const mfs = new MFS();
    const outputPath = path.join(webpackConfig.output.path, webpackConfig.output.filename);
    compiler.outputFileSystem = mfs;
    compiler.watch({}, (err, stats) => {
      if (err) {
        throw err;
      }
      console.log(stats.toString({ colors: true }));
      bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'));
    });
  }
};
