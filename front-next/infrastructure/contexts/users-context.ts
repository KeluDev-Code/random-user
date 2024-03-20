import { createContext } from 'react';
import { UsersContextType } from '@/types/users-context';

export const UsersContext = createContext<UsersContextType | null>(null);
