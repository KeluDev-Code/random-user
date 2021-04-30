import { User } from './User';

export interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}
export interface Reponse {
    results: User[];
    info: Info;
}
