// import 'css-loader!../css/login.css'; //行内loader
import '../css/login.css';
import '../css/login.less';

// import '../css/test.css';

function login() {
  const oH2 = document.createElement('h2');
  oH2.innerHTML = '拉钩教育前端';
  oH2.className = 'title';
  return oH2;
}

document.body.appendChild(login());
