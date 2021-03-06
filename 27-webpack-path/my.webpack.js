const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// webpack自带DefinePlugin
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  // watch: true,
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    // 全局配置asset输出,注ext前面的点不需要
    // 但是，如果我们还有字体等资源打包，全局配置全集中在一个地方，需要单独配置
    // assetModuleFilename: 'img/[name].[hash:4][ext]'
    // 对于在本地通过devServer开启服务，进行资源加载，更多的是关注publicPath
    // output - publicPath: index.html内部引用路径,默认值就是空字符串:
    // 规则：hostname + publicPath + filename
    // publicPath: '',
    // 若想以file协议的形式（Open in default browser) 打开dist目录下的index.html, 在设置此配置时，要写成'./'而非'/'，这是一个绝对路径（从根目录寻址）与相对路径（从dist目录下寻址）的问题
  },
  // 与browserslistrc的冲突貌似被解决了
  // target: 'web',
  devServer: {
    hot: true,
    // contentBase被重命名为static
    // static: {
    //   directory: path.resolve(__dirname, 'public'),
    // },
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
        test: /\.js$/,
        // use: [
        //   {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env'],
        //       // 若此处有targets:{...}，则browserslist配置被忽略
        //     },
        //   },
        // ],
        // 防止node_modules包里面使用了新语法等依赖的polyfill与源代码产生冲突
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.vue$/,
        // vue-loader 15版本之前，不需要plugin处理，到了15需要了；而16是针对vue3的
        use: ['vue-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 不配置自定义选项，默认也有一个ejs模板
    new HtmlWebpackPlugin({
      title: 'webpack path',
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
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
  ],
};
