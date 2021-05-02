import { Dialog, Notify } from 'quasar';
import iconSet from 'quasar/icon-set/mdi-v4';
import lang from 'quasar/lang/es';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/mdi-v4/mdi-v4.css';

import './styles/quasar.sass';

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    notify: {
      message: '',
      position: 'top-right',
      timeout: 8000,
      textColor: 'white',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white' }],
    },
  },
  plugins: {
    Dialog,
    Notify,
  },
  lang,
  iconSet,
};
