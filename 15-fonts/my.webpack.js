const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // 全局配置asset输出,注ext前面的点不需要
    // 但是，如果我们还有字体等资源打包，全局配置全集中在一个地方，需要单独配置
    // assetModuleFilename: 'img/[name].[hash:4][ext]'
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
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:4][ext]',
        },
        // 同样希望存在data-url
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:3][ext]',
        },
      },
    ],
  },
};
