import { Reponse } from '@/models/randomUser/Response';
import { get } from '@/utils/fetch';

export default class RandomUserRepo {
 resource = process.env.VUE_APP_RANDOM_USER_API;

 async getByFilters(query: string): Promise<Reponse> {
   const a = await get<Reponse>(`${this.resource}?${query}`);
   return a;
 }
}
