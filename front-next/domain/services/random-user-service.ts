import { randomUserRepository } from '@/infrastructure/repositories/random-user-repository';

export const randomUserService = {
  getUsers: () => randomUserRepository.getUsers(),
};
