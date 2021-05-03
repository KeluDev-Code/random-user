import fetchMock from 'jest-fetch-mock';

import useRandomUserService from '@/services/RandomUserService';
import randomUserData from './randomUserData.json';
import randomUserDataES from './randomUserDataES.json';

describe('HelloWorld.vue', () => {
  let usedRandomUserService = useRandomUserService();

  beforeEach(async () => {
    fetchMock.resetMocks();
    usedRandomUserService = useRandomUserService();
  });

  test('usersLoading initial value true', () => {
    expect(usedRandomUserService.usersLoading.value).toBe(true);
  });

  test('find 10 Users', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(randomUserData));

    await usedRandomUserService.findUsers({
      results: 10,
      page: 1,
    });

    expect(usedRandomUserService.usersLoading.value).toBe(false);
    expect(usedRandomUserService.users.value).toEqual(randomUserData.results);
  });

  test('find Users with 35 years old filter', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(randomUserData));

    await usedRandomUserService.findUsers({
      results: 10,
      page: 1,
      age: 35,
    });

    expect(usedRandomUserService.users.value?.length).toBe(1);
  });

  test('find Users with ES Nationality filter', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(randomUserDataES));

    await usedRandomUserService.findUsers({
      results: 10,
      page: 1,
      nat: 'ES',
    });

    const user = usedRandomUserService.users.value;

    expect(user?.map((x) => x.nat).every((x) => x === 'ES')).toBe(true);
  });

  test('find 0 Users with female 34 years old filters', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(randomUserData));

    await usedRandomUserService.findUsers({
      results: 10,
      page: 1,
      age: 34,
      gender: 'female',
    });

    expect(usedRandomUserService.usersLoading.value).toBe(false);
    expect(usedRandomUserService.users.value).toEqual([]);
  });
});
