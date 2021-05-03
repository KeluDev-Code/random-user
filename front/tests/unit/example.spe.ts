/* eslint-disable no-global-assign, @typescript-eslint/ban-ts-comment */
import { shallowMount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import fetchMock from 'jest-fetch-mock';

import messages from '@/i18n';
import FavoriteSelect from '@/components/FavoriteSelect.vue';

// @ts-ignore
// global.fetch = require('jest-fetch-mock');

describe('HelloWorld.vue', () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  it('renders props.msg when passed', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

    const msg = 'Añadir a favoritosLista creadaNueva lista';

    const i18n = createI18n({
      locale: 'es', // set locale
      fallbackLocale: 'es', // set fallback locale
      messages, // set locale messages
    });
    const wrapper = shallowMount(FavoriteSelect, {
      global: {
        plugins: [i18n],
      },
    });
    expect(wrapper.find('.q-btn.disable')).toMatch(msg);
  });
});
