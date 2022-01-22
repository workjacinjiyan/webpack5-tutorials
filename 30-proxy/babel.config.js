module.exports = {
  presets: [
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
  ],
  plugins: [['react-refresh/babel']],
  // 若数组中有targets:{...}，则browserslist配置被忽略
  exclude: [/\bcore-js\b/, /\bwebpack\/buildin\b/, /@babel\/runtime-corejs3/],
};
