/* eslint-disable no-global-assign, @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mount, shallowMount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import { expect } from 'chai';

import FavoriteSelect from '@/components/FavoriteSelect.vue';

// @ts-ignore
// global.SVGElement = global.Element;

describe('FavoriteSelect', () => {
  // fetch = jest.fn(() => Promise.resolve());

  const wrapper = shallowMount(FavoriteSelect);

  it('should render as ', () => {
    expect(wrapper.find('.q-btn.disabled').exists()).to.be.true;
  });
});
