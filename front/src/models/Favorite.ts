import { User } from './randomUser/User';

export interface Favorite {
    nickName: string;
    users: User[];
}

export interface FavoriteResponse {
    favorites?: Favorite[]
}
