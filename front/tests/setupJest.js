/* eslint-disable @typescript-eslint/no-var-requires */
// global.fetch = require('jest-fetch-mock');
// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock();
