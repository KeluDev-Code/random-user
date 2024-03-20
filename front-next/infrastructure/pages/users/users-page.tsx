'use client';

import { useMemo } from 'react';
import { SortBy, User } from '@/adapters/dto/random-user';
import { UsersList } from '@/infrastructure/pages/users/users-list';
import { Btn } from '@/components/ui/core/btn';
import { useUsers } from '@/hooks/use-users';
import { UsersContext } from '@/infrastructure/contexts/users-context';

interface Props {
  users: User[]
}

export function UsersPage({ users }: Props) {
  const {
    showColors,
    toggleColors,

    filterCountry,
    setFilterCountry,
    toggleSortByCountry,

    sorting,
    sortedUsers,
    handleChangeSort,

    handleReset,
    handleDelete,
  } = useUsers(users);

  const usersContextValue = useMemo(() => ({
    showColors,
    users: sortedUsers,
    changeSorting: handleChangeSort,
    deleteUser: handleDelete,
  }), [showColors, sortedUsers, handleChangeSort, handleDelete]);

  return (
    <div>
      <h3 className="h3 pb-4 text-blue-500">Listado de Usuarios de al Api RandomUsers</h3>

      <header className="my-8 flex gap-4">
        <Btn color="primary" onClick={toggleColors}>
          Colorear filas
        </Btn>

        <Btn color="primary" onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </Btn>

        <Btn color="primary" onClick={handleReset}>
          Restaurar estado
        </Btn>

        <input
          className="form-input"
          placeholder="Filtra por país"
          value={filterCountry}
          onChange={(ev) => {
            setFilterCountry(ev.target.value);
          }}
        />
      </header>

      <main>
        <UsersContext.Provider value={usersContextValue}>
          <UsersList />
        </UsersContext.Provider>
      </main>
    </div>
  );
}
