import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
type ISearchableContext = {
  searchValue: string;
  setSearchValue: (value: SetStateAction<string>) => void;
};
type ISearchableContextProviderProps = {
  children: ReactNode;
};

const SearchableContext = createContext<ISearchableContext>({
  searchValue: '',
  setSearchValue: () => {
    null;
  },
});

export const useSearchableContext = () => useContext(SearchableContext);

export const SearchableContextProvider = ({
  children,
}: ISearchableContextProviderProps) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <SearchableContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchableContext.Provider>
  );
};
