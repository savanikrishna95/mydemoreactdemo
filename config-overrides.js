// config-overrides.js
// const webpack = require('webpack');

// module.exports = function override(config, env) {
//   // Add or update the devServer and plugins configuration
//   config.devServer = {
//     ...config.devServer,
//     hot: true,
//   };

//   config.plugins = [
//     ...config.plugins,
//     new webpack.HotModuleReplacementPlugin(),
//   ];

//   return config;
// };


// config-overrides.js
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// module.exports = function override(config, env) {
//   // Add the React Refresh plugin
//   config.plugins = [
//     ...config.plugins,
//     new ReactRefreshWebpackPlugin(),
//   ];

//   // Enable Fast Refresh
//   config.resolve = {
//     ...config.resolve,
//     alias: {
//       ...config.resolve.alias,
//       'react-dom': '@hot-loader/react-dom',
//     },
//   };

//   return config;
// };
