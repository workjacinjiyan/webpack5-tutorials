import 'core-js/stable';
import 'regenerator-runtime/runtime';

const title = '前端';
const foo = () => {
  console.log(title);
};

const p1 = new Promise((resolve, reject) => {
  console.log(111);
});
console.log(p1);

foo();

/**
 *
 *  1.polyfill是什么: babel-present-env不全
 *  2.webpack5之前默认设置polyfill, webpack5之后去除掉，让用户按需配置
 *  3.@babel/polyfill安装 babel7.4.0之后废除 --> core-js, regenerator-runtime
 *  4. core-stable对进入标准的语法进行概括
 *  5. regenerator-runtime处理例如Promise语法，会生成 function Promise(){...}
 *  */
