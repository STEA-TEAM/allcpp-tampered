import '@quasar/extras/material-icons/material-icons.css';
import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';

import { APP_ID } from './config';

import App from './App.vue';

function init() {
  let div = document.createElement('div');
  div.setAttribute('id', APP_ID);
  document.body.appendChild(div);
  const myApp = createApp(App);
  myApp.use(Quasar, {
    plugins: {},
    config: {
      dark: 'auto',
    },
  });
  myApp.mount(`#${APP_ID}`);
}

export default {
  init,
};
