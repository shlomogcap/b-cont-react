import {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  IOptionsListContext,
  IOptionsListProviderProps,
} from './OptionsList.types';

const OptionsListContext = createContext<IOptionsListContext>({
  setIsListOpen: () => null,
  isListOpen: false,
});

export const useOptionsListContext = () => useContext(OptionsListContext);

export const OptionsListProvider = ({
  children,
}: IOptionsListProviderProps) => {
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <OptionsListContext.Provider value={{ isListOpen, setIsListOpen }}>
      {children}
    </OptionsListContext.Provider>
  );
};
