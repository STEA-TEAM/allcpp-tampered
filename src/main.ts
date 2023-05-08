import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css';
import { prepare } from '@/prepare';
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import App from '@/App.vue';
import { Dialog, Notify, Quasar } from 'quasar';
import router from '@/router';

(async () => {
  if (await prepare()) {
    Chart.register(
      LineElement,
      PointElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
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
    app.mount('#__allcpp_tampered__');
  }
})();
