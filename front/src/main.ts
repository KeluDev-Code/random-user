import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import quasarUserOptions from './quasar-user-options';
import messages from '@/i18n';

const i18n = createI18n({
  locale: 'es', // set locale
  fallbackLocale: 'es', // set fallback locale
  messages, // set locale messages
});

const app = createApp(App);

app.use(Quasar, quasarUserOptions);
app.use(router);
app.use(i18n);

app.mount('#app');
