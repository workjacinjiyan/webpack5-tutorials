import { sum, square } from './js/utils';
const { getInfo } = require('./js/api');

import './js/login';

console.log(sum(10, 20));
console.log(square(10));
console.log(getInfo());

// 01 为什么需要loader 02
/**
 * 1. 工程化
 * 2. 兼容性： CSS新特性，JS新语法
 * 3. 如何实现兼容操作：postcss, babel, autoprefixer等工具
 * 4. 到底要兼容哪些平台: browserslist 实际上就是声明了⼀段浏览器的集合，我们的⼯具可以根据这段集合描述，针对性的输出兼容性代码。
 * 5.目前使用它的工具有：
        Autoprefixer
        Babel
        postcss-preset-env
        eslint-plugin-compat
        stylelint-no-unsupported-browser-features
        postcss-normalize
        obsolete-webpack-plugin

 * *caniuse.com --> browser usage table
 *
 *
 * >1%
 * default
 * dead 24个月之内没有官方维护更新的，比如IE10和IE11 mobile
 * last 2 versions
 * 
 * */
