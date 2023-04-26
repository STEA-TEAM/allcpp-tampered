import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import { prepareTargetElement } from '@/mount';
import '@quasar/extras/material-icons/material-icons.css';
import router from '@/router';

const injectId = '__tamper_vite__';
const app = createApp(App);

app.use(Quasar, {
  config: {},
  plugins: {},
});

app.use(createPinia());
app.use(router);

(async () => {
  if (await prepareTargetElement(injectId)) {
    app.mount(`#${injectId}`);
  }
})();
