
import { Metadata } from 'next';

import { randomUserService } from '@/domain/services/random-user-service';
import { UsersPage } from '@/infrastructure/pages/users/users-page';

export const metadata: Metadata = {
  title: 'Table Random user',
};

export default async function UsersTable() {
  const users = await randomUserService.getUsers();

  return (
    <UsersPage users={users} />
  );
}
