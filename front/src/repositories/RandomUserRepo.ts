import { Reponse } from '@/models/randomUser/Response';
import { get } from '@/utils/fetch';

export default class RandomUserRepo {
 resource = 'https://randomuser.me/api';

 async getByFilters(query: string): Promise<Reponse> {
   const a = await get<Reponse>(`${this.resource}?${query}`);
   return a;
 }
}
