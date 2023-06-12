import { Dispatch, ReactNode, SetStateAction } from 'react';

type IOptionValue = number | string | boolean;

export type IOnOptionClickArgs<V extends IOptionValue = IOptionValue> = {
  value: V;
};

export type IListOption<V extends IOptionValue = IOptionValue> = {
  text: string;
  value: V;
  onOptionClick: (args: IOnOptionClickArgs<V>) => void;
};
export type IOptionsListProps = {
  options: IListOption[];
};

export type IOptionsListContext = {
  isListOpen: boolean;
  setIsListOpen: Dispatch<SetStateAction<boolean>>;
};

export type IOptionsListProviderProps = {
  children: ReactNode;
};
