import type { SortBy, User } from '@/adapters/dto/random-user';

export type UsersContextType= {
  changeSorting: (sort: SortBy) => void
  deleteUser: (email: string) => void
  showColors: boolean
  users: User[]
}
