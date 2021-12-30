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
      // {
      //   test: /\.css$/, //一般就是一个正则表达式，匹配我们的处理文件
      //   use: [
      //     {
      //       loader: 'css-loader',
      //     },
      //   ],
      // },
      // {
      //   test: /\.css$/,
      //   loader: 'css-loader',
      // },
      {
        test: /\.css$/,
        use: ['css-loader'], //可以数组中，把字符串和对象混用
      },
    ],
  },
};
