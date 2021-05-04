/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import {
  mount, shallowMount, VueWrapper, config,
} from '@vue/test-utils';
import { useI18n } from 'vue-i18n';
import fetchMock from 'jest-fetch-mock';
import {
  QCardSection, QSelect, QSeparator, QInput, QBtn, QCardActions, QCard, QDialog,
} from 'quasar';

import FavoriteSelect from '@/components/FavoriteSelect.vue';

// @ts-ignore
//
const QComponents = {
  QCardSection, QSelect, QSeparator, QInput, QBtn, QCardActions, QCard, QDialog,
};

// establecemos globalmente un mock de $t
// config.global.mocks.$t = (key:string) => key;
// establecemos globalmente los components
// config.global.components = QComponents;

// mock sobre la libreria 'vue-i18n' donde solo se hace el mock a 'useI18n'
jest.mock(
  'vue-i18n',
  () => {
    const mUseI18n = { t: (key:string) => key };
    return {
      ...(jest.requireActual('vue-i18n')),
      useI18n: jest.fn(() => mUseI18n),
    };
  },
  { virtual: true },
);

describe('FavoriteSelect.vue', () => {
  let wrapper : VueWrapper<any>;

  beforeEach(() => {
    fetchMock.doMock();

    wrapper = shallowMount(FavoriteSelect, {
      global: {
        // establecemos los components del fichero
        components: QComponents,
      },
    });
  });

  test('debe de mostrarse correctamente', () => {
    // const { html } = wrapper;
    expect(wrapper.element).toMatchSnapshot();
  });

  test('renders props.msg when passed', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

    const DOM = wrapper.find('.q-btn.disable');
    expect(DOM.exists()).toBe(false);
  });
});
