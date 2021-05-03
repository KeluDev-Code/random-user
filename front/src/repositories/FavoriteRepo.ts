import { Favorite, FavoriteResponse } from '@/models/Favorite';
import * as fetch from '@/utils/fetch';

export default class FavoriteRepo {
 resource = `${process.env.VUE_APP_FAVORITE_API}/favorite`;

 async getAll(): Promise<Favorite[]> {
   const response = await fetch.get<FavoriteResponse>(`${this.resource}`);
   return response?.favorites || [];
 }

 async post(favorite: Favorite): Promise<null> {
   await fetch.post<Favorite, null>(`${this.resource}`, favorite);
   return null;
 }

 async put(favorite: Favorite): Promise<Favorite[]> {
   const response = await fetch.put<Favorite, FavoriteResponse>(`${this.resource}/${favorite.nickName}`, favorite);
   return response?.favorites || [];
 }

 async delete(favorite: Favorite): Promise<null> {
   await fetch.remove<Favorite, FavoriteResponse>(`${this.resource}/${favorite.nickName}`, favorite);
   return null;
 }
}
