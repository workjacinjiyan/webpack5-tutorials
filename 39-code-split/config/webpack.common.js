const resolveApp = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

// 导入其他的配置
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');

module.exports = (env) => {
  const isProduction = env.production;

  // 为了使babel.config.js配置文件能访问到 process.env.NODE_ENV
  process.env.NODE_ENV = isProduction ? 'production' : 'development';

  const config = isProduction ? prodConfig : devConfig;

  const mergedConfig = merge(commonConfig, config);

  return mergedConfig;
};

// 定义对象，保存base配置信息
const commonConfig = {
  entry: {
    // 方法1
    // main11111: './src/main1.js',
    // main22222: './src/main2.js',
    // 方法2.1
    // main1: {
    //   import: './src/main1.js',
    //   dependOn: 'lodash',
    // },
    // main2: {
    //   import: './src/main2.js',
    //   dependOn: 'lodash',
    // },
    // lodash: 'lodash',
    // 方法2.2
    // main1: {
    //   import: './src/main1.js',
    //   dependOn: 'shared',
    // },
    // main2: {
    //   import: './src/main2.js',
    //   dependOn: 'shared',
    // },
    // shared: ['lodash', 'jquery'],

    index: './src/index.js',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.vue'],
    alias: {
      // 参考其他教授教的做法，将路径操作单独拎出去生成一个模块
      // '@': path.resolve(__dirname, '../src')
      '@': resolveApp('./src'),
    },
  },
  output: {
    filename: 'js/[name].build.js',
    chunkFilename: '[id].js',
    // path: path.resolve(__dirname, '../dist')
    path: resolveApp('./dist'),
    // 全局配置asset输出,注ext前面的点不需要
    // 但是，如果我们还有字体等资源打包，全局配置全集中在一个地方，需要单独配置
    // assetModuleFilename: 'img/[name].[hash:4][ext]'
  },
  optimization: {
    minimizer: [
      // 去除build之后的license.txt
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
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
    ],
  },
  plugins: [
    // 不配置自定义选项，默认也有一个ejs模板
    new HtmlWebpackPlugin({
      title: 'code-split',
      // 模板路径，通常在public文件夹下
      template: './public/index.html',
    }),
  ],
};
