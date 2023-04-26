import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import '@/assets/main.css';
import { prepareTargetElement } from '@/mount';
import router from '@/router';

const injectId = '__tamper_vite__';
const app = createApp(App);

app.use(createPinia());
app.use(router);

(async () => {
  if (await prepareTargetElement(injectId)) {
    app.mount(`#${injectId}`);
  }
})();
