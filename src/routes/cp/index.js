import { Notify, Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';

import { APP_ID } from './config';

import App from './App.vue';
import { addElement, getElement } from '../../utils';

export default async () => {
  addElement(
    'link',
    null,
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    },
    await getElement('head')
  );
  await getElement('.sc-idXgbr');
  let injectContainer = (await getElement('.margin-top-nav')).parentElement;
  injectContainer.style.gap = '20px';
  injectContainer.style.width = 'auto';
  // noinspection JSCheckFunctionSignatures
  addElement(
    'div',
    null,
    {
      id: APP_ID,
      className: 'margin-top-nav',
      style: [`height: calc(100vh - 105px)`, 'width: 300px'].join('; '),
    },
    injectContainer,
    injectContainer.firstChild
  );
  const myApp = createApp(App);
  myApp.use(Quasar, {
    config: {
      notify: {},
    },
    plugins: { Notify },
  });
  myApp.mount(`#${APP_ID}`);
};
