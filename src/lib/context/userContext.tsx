import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';

type IUserContext = {
  data: User | null;
  isLoading: boolean;
  error: string;
};

const UserContext = createContext<IUserContext>({
  data: null,
  isLoading: false,
  error: '',
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = UserContext.Provider;
