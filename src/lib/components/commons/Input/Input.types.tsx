import { ReactElement } from 'react';

export type IInputProps<T extends string = string> = {
  name: string;
  label: string;
  isRequired?: boolean;
  hideLabel?: boolean;
  inputElement: ReactElement<HTMLInputElement | any>;
  afterChange?: (v: T) => void;
  readOnly?: boolean;
};
