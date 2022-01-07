import '../fonts/iconfont.css';
import '../css/index.css';

function packFonts() {
  const oEle = document.createElement('div');

  const oSpan = document.createElement('span');
  oSpan.className = 'if if-biohazard lg-icon';

  oEle.appendChild(oSpan);

  return oEle;
}

document.body.appendChild(packFonts());
