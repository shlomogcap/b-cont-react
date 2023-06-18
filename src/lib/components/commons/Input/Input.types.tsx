import { ReactElement } from 'react';

export type TInputProps<T extends string = string> = {
  name: string;
  label: string;
  isRequired?: boolean;
  inputElement: ReactElement<HTMLInputElement | any>;
  afterChange?: (v: T) => void;
};
