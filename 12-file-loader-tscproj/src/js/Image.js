import oImgSrc from '../img/01.twitter.jpeg';
import '../css/images.css';

function packImg() {
  // 1. 创建容器元素
  const oEle = document.createElement('div');
  // 2.创建img标签，设置src属性
  const oImg = document.createElement('img');
  // webpack5中直接导出的是一个对象。如果config里面没有设置，需要访问default属性
  // oImg.src = require('../../img/01.twitter.jpeg').default;
  // oImg.src = require('../../img/01.twitter.jpeg');
  oImg.src = oImgSrc;
  oEle.appendChild(oImg);

  // 3.设置背景图片
  const oBgImg = document.createElement('div');
  oBgImg.className = 'bgBox';
  oEle.appendChild(oBgImg);

  return oEle;
}

document.body.appendChild(packImg());
