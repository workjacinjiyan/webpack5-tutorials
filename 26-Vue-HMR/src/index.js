import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './title';
import Vue from 'vue';
import App from './App.vue';

if (module.hot) {
  module.hot.accept(['./title.js'], () => {
    console.log('title.js模块更新了');
  });
}

new Vue({
  render: (h) => h(App),
}).$mount('#root');
