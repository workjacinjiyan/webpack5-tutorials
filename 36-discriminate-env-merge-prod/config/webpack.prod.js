const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // watch: true,
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    // 不配置自定义选项，默认也有一个ejs模板
    new CopyWebpackPlugin({
      patterns: [
        {
          // public为目标源
          from: 'public',
          // to可以默认不写，默认寻找dist目录
          // HtmlWebpackPlugin已经存在
          globOptions: {
            // **表示从public
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
};
