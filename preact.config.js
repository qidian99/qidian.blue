const webpack = require("webpack");
import path from 'path';
import { lstatSync, readdirSync } from 'fs';

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

export default (config, env, helpers) => {
  // getDirectories('src/').map((dir) => {
  //   config.resolve.alias[dir.replace('src/', '')] = path.resolve(__dirname, dir);
  // });

  const aliases = config.resolve.alias;
  aliases.react = "preact/compat";
  aliases["react-dom"] = "preact/compat";
  // let { plugin } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
  // plugin.options.sourceMap = false
  config.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }));
}
