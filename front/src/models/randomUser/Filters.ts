export interface Filters {
  [x: string]: unknown;
  results?: number;
  page?: number;
  gender?: 'female' | 'male';
  age?: number;
  nat?: string;
}
