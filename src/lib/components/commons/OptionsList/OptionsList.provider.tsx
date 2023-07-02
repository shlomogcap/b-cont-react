import { useContext, useState, createContext, useCallback } from 'react';
import {
  IOptionsListContext,
  IOptionsListProviderProps,
} from './OptionsList.types';

const OptionsListContext = createContext<IOptionsListContext>({
  openList: () => null,
  closeList: () => null,
  toggleList: () => null,
  isListOpen: false,
});

export const useOptionsListContext = () => useContext(OptionsListContext);

export const OptionsListProvider = ({
  children,
}: IOptionsListProviderProps) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const openList = useCallback(() => setIsListOpen(true), []);
  const closeList = useCallback(() => setIsListOpen(false), []);
  const toggleList = useCallback(() => setIsListOpen((prev) => !prev), []);
  return (
    <OptionsListContext.Provider
      value={{ isListOpen, openList, closeList, toggleList }}
    >
      {children}
    </OptionsListContext.Provider>
  );
};
