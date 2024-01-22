// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add or update the devServer and plugins configuration
  config.devServer = {
    ...config.devServer,
    hot: true,
  };

  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ];

  return config;
};
