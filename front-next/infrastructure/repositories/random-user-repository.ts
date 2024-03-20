import { RandomUserResults } from '@/adapters/dto/random-user';
import { http } from '@/adapters/http-fetch';

const urlRandomUser = 'https://randomuser.me/api';

export const randomUserRepository = {
  getUsers: async (results = 100) => {
    const response = await http.get<RandomUserResults>(`${urlRandomUser}?results=${results}`);

    return response?.results ?? [];
  },
};
