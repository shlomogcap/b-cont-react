import { ReactNode } from 'react';

type IOptionValue = number | string | boolean;

export type IOnOptionClickArgs<V extends IOptionValue = IOptionValue> = {
  value: V;
};

export type IListOption<V extends IOptionValue = IOptionValue> = {
  text: string;
  value: V;
  disabled?: boolean;
  onOptionClick: (args: IOnOptionClickArgs<V>) => void;
};
export type IOptionsListProps = {
  options: IListOption[];
};

export type IOptionsListContext = {
  isListOpen: boolean;
  openList: () => void;
  closeList: () => void;
  toggleList: () => void;
};

export type IOptionsListProviderProps = {
  children: ReactNode;
};

export type IStyledListItemProps = {
  isDisabled?: boolean;
};
