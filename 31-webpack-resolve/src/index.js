import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './title';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

if (module.hot) {
  module.hot.accept(['./title.js'], () => {
    console.log('title.js模块更新了');
  });
}

ReactDOM.render(<App />, document.getElementById('app'));

axios
  .get('/api/users')
  .then((res) => {
    console.log(res.data);
  })
  .catch(() => {});
