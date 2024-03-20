import { useMemo, useState } from 'react';
import { SortBy, User } from '@/adapters/dto/random-user';

export function useUsersColor() {
  const [showColors, setShowColors] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };
  return { showColors, toggleColors };
}

export function useUsersFilter(users: User[]) {
  const [filterCountry, setFilterCountry] = useState<string>('');

  const filteredUsers = useMemo(() => (filterCountry.length > 0
    ? users.filter((user) => user.location
      .country.toLowerCase().includes(filterCountry.toLowerCase()))
    : users), [users, filterCountry]);

  return {
    filteredUsers,
    filterCountry,
    setFilterCountry,
  };
}

export function useUsersSorting(users: User[]) {
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return users;

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return users.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [users, sorting]);

  return {
    sorting,
    setSorting,
    sortedUsers,
    handleChangeSort,
    toggleSortByCountry,
  };
}

export function useUsers(originalUsers: User[]) {
  const { showColors, toggleColors } = useUsersColor();

  const [users, setUsers] = useState<User[]>(originalUsers);

  const {
    filteredUsers,
    filterCountry,
    setFilterCountry,
  } = useUsersFilter(users);

  const {
    sorting,
    sortedUsers,
    handleChangeSort,
    toggleSortByCountry,
  } = useUsersSorting(filteredUsers);

  const handleReset = () => {
    setFilterCountry('');
    setUsers(originalUsers);
  };

  const handleDelete = (email: string) => {
    const usersDeleted = users.filter((user) => user.email !== email);
    setUsers(usersDeleted);
  };

  return {
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
  };
}
