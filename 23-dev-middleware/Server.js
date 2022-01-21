const express = require('express');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const app = express();

// 获取配置文件
const config = require('./webpack.config');
const compiler = webpack(config);

app.use(WebpackDevMiddleware(compiler));

// 开启端口上的服务监听
app.listen(5000, () => {
  console.log('服务开启在5000上');
});
