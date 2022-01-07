const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // loader配置项
  module: {
    rules: [
      {
        test: /\.css$/,
        // 默认从右往左或从下往上
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // css 处理 url时，把其转换成require语法,与file-loader里的esModule没关系
              esModule: false,
            },
          },
          'postcss-loader',
        ], //可以数组中，把字符串和对象混用
      },
      {
        test: /\.less$/,
        // 默认从右往左或从下往上
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ], //可以数组中，把字符串和对象混用
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              name: 'img/[name].[hash:6].[ext]',
              // outputPath: 'img',
              // base64值域
              limit: 40 * 1024,
            },
          },
        ],
      },
    ],
  },
};
