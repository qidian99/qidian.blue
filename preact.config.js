const webpack = require("webpack");
import path from 'path';
import { lstatSync, readdirSync } from 'fs';

const gsapPath = "node_modules/gsap/src/uncompressed/";
const scrollMagicPath = "node_modules/scrollmagic/scrollmagic/uncompressed/";

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

export default (config, env, helpers) => {
  // getDirectories('src/').map((dir) => {
  //   config.resolve.alias[dir.replace('src/', '')] = path.resolve(__dirname, dir);
  // });
  // console.log(path.resolve(__dirname, 'node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'));
  // console.log(config);

  const aliases = config.resolve.alias;
  aliases.react = "preact/compat";
  aliases["react-dom"] = "preact/compat";
  aliases["npm"] = 'node_modules';
  aliases["CSSPlugin"] = "gsap";
  aliases["TweenLite"] = "gsap";
  aliases["TweenMax"] = "gsap";
  aliases["Timeline"] = "gsap";
  aliases["TimelineLite"] = "gsap";
  aliases["TimelineMax"] = "gsap";
  // aliases["ScrollMagic"] = path.resolve(__dirname, scrollMagicPath + 'ScrollMagic.js');
  aliases["animation.gsap"] = path.resolve(__dirname, scrollMagicPath + 'plugins/animation.gsap.js');
  aliases["debug.addIndicators"] = path.resolve(__dirname, scrollMagicPath + 'plugins/debug.addIndicators.js');
  aliases["Draggable"] = path.resolve(__dirname, gsapPath + "utils/Draggable.js");
  aliases["ScrollToPlugin"] = path.resolve(__dirname, gsapPath + "plugins/ScrollToPlugin.js");


  // let { plugin } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
  // plugin.options.sourceMap = false
  config.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }), new webpack.ProvidePlugin({
    jQuery: "jquery",
    $: "jquery",
    jquery: "jquery"
  }));
}
