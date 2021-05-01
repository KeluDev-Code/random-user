import { ref } from 'vue';

import { Filters } from '@/models/randomUser/Filters';
import { User } from '@/models/randomUser/User';
import RandomUserRepo from '@/repositories/RandomUserRepo';

const randomUserRepo = new RandomUserRepo();

export default function useRandomUser(findFilters?: Filters) {
  const users = ref<User[]>();
  const usersLoading = ref(false);

  const findUsers = async (filters: Filters) => {
    usersLoading.value = true;
    const filtersInner = { ...filters };

    Object.keys(filtersInner).forEach((key) => (filtersInner && filtersInner[key] === undefined) && delete filtersInner[key]);
    const query = Object.keys(filtersInner).map((key) => `${key}=${filtersInner[key]}`).join('&');

    const data = await randomUserRepo.getByFilters(query);

    users.value = data.results;

    usersLoading.value = false;
  };

  if (findFilters) findUsers(findFilters);

  return { users, usersLoading, findUsers };
}
