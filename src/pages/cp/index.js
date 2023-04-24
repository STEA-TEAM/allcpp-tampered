import { Quasar } from 'quasar';
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
  let injectNeighbor = await getElement('.sc-hTBuwn.gfpJHc');
  let injectContainer = injectNeighbor.parentElement;
  injectContainer.style.gap = '40px';
  injectContainer.style.width = 'auto';
  addElement(
    'div',
    null,
    {
      id: APP_ID,
      className: 'margin-top-nav',
      style: [`height: ${injectContainer.offsetHeight}px`, 'width: 300px'].join(
        '; '
      ),
    },
    injectContainer,
    injectNeighbor
  );
  const myApp = createApp(App);
  myApp.use(Quasar, {
    config: {},
    plugins: {},
  });
  myApp.mount(`#${APP_ID}`);
};
