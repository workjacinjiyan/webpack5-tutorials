// babel plugins 的react refresh 在生产模式下是不需要的，仅在开发模式需要
const presets = [
  [
    '@babel/preset-env',
    {
      // false为默认值,不对当前的js作polyfill填充
      // usage：根据用户源代码使用到新语法进行填充
      // entry：仅仅依据browserslist或者babel targets筛选出来的浏览器填充，无视用户源代码的需求
      useBuiltIns: 'entry',
      // 大版本3
      corejs: {
        version: '3',
        proposals: true,
      },
    },
  ],
  // 处理jsx
  ['@babel/preset-react'],
];

const plugins = [];
// 依据当前的打包模式，来决定plugins的值
console.log(process.env.NODE_ENV, '<-------');
const isProduction = process.env.NODE_ENV === 'production';

// 如果为开发模式
if (!isProduction) {
  plugins.push(['react-refresh/babel']);
}

module.exports = {
  presets,
  // production里面会有这个报错
  plugins,
  // 若数组中有targets:{...}，则browserslist配置被忽略
  exclude: [/\bcore-js\b/, /\bwebpack\/buildin\b/, /@babel\/runtime-corejs3/],
};
