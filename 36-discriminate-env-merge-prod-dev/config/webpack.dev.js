const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  // watch: true,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  // 与browserslistrc的冲突貌似被解决了
  // target: 'web',
  devServer: {
    hot: 'only',
    historyApiFallback: true,
    port: 6060,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
