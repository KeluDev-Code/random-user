import { Filters } from '@/models/randomUser/Filters';
import { Reponse } from '@/models/randomUser/Response';
import RandomUserRepo from '@/repositories/RandomUserRepo';

const randomUserRepo = new RandomUserRepo();

export default function useRandomUser() {
  const findUsers = (filters: Filters) => new Promise<Reponse | undefined>(async (resolve) => {
    const filtersInner = { ...filters };

    Object.keys(filtersInner).forEach((key) => (filtersInner && filtersInner[key] === undefined) && delete filtersInner[key]);
    const query = Object.keys(filtersInner).map((key) => `${key}=${filtersInner[key]}`).join('&');

    const data = await randomUserRepo.getByFilters(query);

    console.log(data);

    resolve(data);
  });

  return { findUser: findUsers };
}
