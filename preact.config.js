export default (config, env, helpers) => {
  const aliases = config.resolve.alias;
  aliases.react = "preact-compat";
  aliases["react-dom"] = "preact-compat";
  // let { plugin } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
  // plugin.options.sourceMap = false
}
