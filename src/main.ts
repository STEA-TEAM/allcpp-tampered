import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
import { Dialog, Notify, Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import App from '@/App.vue';
import { prepareTargetElement } from '@/mount';
import '@quasar/extras/material-icons/material-icons.css';
import router from '@/router';

const injectId = '__tamper_vite__';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);
app.use(pinia);
app.use(Quasar, {
  config: {},
  plugins: { Dialog, Notify },
});
app.use(router);

(async () => {
  if (await prepareTargetElement(injectId)) {
    app.mount(`#${injectId}`);
  }
})();
