import { sum, square } from './js/utils';
const { getInfo } = require('./js/api');

import './js/login';

console.log(sum(10, 20));
console.log(square(10));
console.log(getInfo());

/**
 * 1. postcss 是什么： 利用 javascript 转换样式的工具
 * 2. less(less-loader) -> css -> css-loader
 * */
