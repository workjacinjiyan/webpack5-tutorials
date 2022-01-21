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
console.log('前端444');
/**
 *
 * 开发模式：
 *  - watch
 *  - live-server
 * 不足
 *  1. 所有 源代码 都会重新编译
 *  2. 每次编译成功之后，都要进行文件读写
 *  3. live-server
 *  4. 不能实现局部刷新
 *  */
