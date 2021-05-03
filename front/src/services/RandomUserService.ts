import { ref } from 'vue';

import { Filters } from '@/models/randomUser/Filters';
import { User } from '@/models/randomUser/User';
import RandomUserRepo from '@/repositories/RandomUserRepo';

const randomUserRepo = new RandomUserRepo();

export default function useRandomUser() {
  const users = ref<User[]>();
  const usersLoading = ref(true);

  const findUsers = async (filters: Filters) => {
    usersLoading.value = true;
    const filtersInner = { ...filters };

    Object.keys(filtersInner)
      .forEach((key) => (filtersInner && (filtersInner[key] === null || filtersInner[key] === undefined)) && delete filtersInner[key]);
    const query = Object.keys(filtersInner).map((key) => `${key}=${filtersInner[key]}`).join('&');

    const data = await randomUserRepo.getByFilters(query);

    if (filtersInner.age) {
      data.results = data.results.filter((x) => x.dob.age === parseInt(filtersInner.age?.toString() || '', 10));
    }

    users.value = data.results;

    usersLoading.value = false;
  };

  return {
    users, usersLoading, findUsers,
  };
}
