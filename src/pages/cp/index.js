import '@quasar/extras/material-icons/material-icons.css';
import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';

import { APP_ID } from './config';

import App from './App.vue';
import { addElement, getElement } from '../../utils';

export default async () => {
  let injectNeighbor = await getElement('.sc-hTBuwn.gfpJHc');
  let injectContainer = injectNeighbor.parentElement;
  let injectReference = await getElement('.sc-jfTVlA.iDrJRK');
  injectContainer.style.gap = '40px';
  injectContainer.style.width = 'auto';
  addElement(
    'div',
    null,
    {
      id: APP_ID,
      className: 'margin-top-nav',
      style: [
        `height: ${injectReference.offsetHeight}px`,
        `width: ${injectReference.offsetWidth}px`,
      ].join('; '),
    },
    injectContainer,
    injectNeighbor
  );
  const myApp = createApp(App);
  myApp.use(Quasar, {
    plugins: {},
    config: {},
  });
  myApp.mount(`#${APP_ID}`);
};
