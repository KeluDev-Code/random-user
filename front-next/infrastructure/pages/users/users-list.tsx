'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { SortBy } from '@/adapters/dto/random-user';
import { Btn } from '../../../components/ui/core/btn';
import { UsersContext } from '@/infrastructure/contexts/users-context';

export function UsersList() {
  const usersContext = useContext(UsersContext);
  if (!usersContext) {
    return (
      <h3 className="h3 text-orange-600">Falta el contexto de usuarios</h3>
    );
  }

  const {
    changeSorting,
    deleteUser,
    showColors,
    users,
  } = usersContext;

  return (
    <table width="100%">
      <thead>
        <tr className="border-gray-700 border-b-2 *:py-2">
          <th>Foto</th>
          <th
            className="cursor-pointer hover:bg-gray-800"
            onClick={() => { changeSorting(SortBy.NAME); }}
          >
            Nombre

          </th>
          <th
            className="cursor-pointer hover:bg-gray-800"
            onClick={() => { changeSorting(SortBy.LAST); }}
          >
            Apellido

          </th>
          <th
            className="cursor-pointer hover:bg-gray-800"
            onClick={() => { changeSorting(SortBy.COUNTRY); }}
          >
            País

          </th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody className={showColors ? 'table--showColors' : ''}>
        {
          users.map((user) => (
            <tr key={user.email} className="hover:!bg-gray-900">
              <td>
                <div className="flex justify-center py-2">
                  <Image src={user.picture.thumbnail} alt="user thumbnail" width="50" height="50" />
                </div>
              </td>
              <td>
                {user.name.first}
              </td>
              <td>
                {user.name.last}
              </td>
              <td>
                {user.location.country}
              </td>
              <td>
                <Btn
                  color="error"
                  onClick={() => { deleteUser(user.email); }}
                >
                  Borrar
                </Btn>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
