const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// webpack自带DefinePlugin
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  // watch: true,
  mode: 'development',
  // devtool: 'eval'默认值
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    // 全局配置asset输出,注ext前面的点不需要
    // 但是，如果我们还有字体等资源打包，全局配置全集中在一个地方，需要单独配置
    // assetModuleFilename: 'img/[name].[hash:4][ext]'
  },
  // 与browserslistrc的冲突貌似被解决了
  // target: 'web',
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
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
              // 如果不设置 esModule 为 false，那么默认它会将图片导出一个module对象，而不是一个url路径，所以此时页面图片当然加载不出来了。
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
              esModule: false,
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
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.ts$/,
        // ts-loader无法填充polyfill
        // 但是ts-loader依然有存在的必要，预防编译阶段的错误，以免运行时再暴露
        // 因此，可以在scripts里面配置命令
        // "build": tsc --noEmit && webpack
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 不配置自定义选项，默认也有一个ejs模板
    new HtmlWebpackPlugin({
      title: 'ts-loader-babel-loader',
      // 模板路径，通常在public文件夹下
      template: './public/index.html',
    }),
    // 比如设置全局变量
    new DefinePlugin({
      // 注意：const AAA = ./，若想让BASE_URL以字符串形式出现，要多加一对引号
      // BASE_URL: './',
      BASE_URL: '"./"',
    }),
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
    // new ReactRefreshWebpackPlugin(),
  ],
};
