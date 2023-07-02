import { IInputProps } from '../../Input.types';

type IDropdownValue = number | string | boolean;

export type IDropdownOption<V extends IDropdownValue = IDropdownValue> = {
  text: string;
  value: V;
};
export type IDropdownInputProps = Omit<IInputProps, 'inputElement'> & {
  options: IDropdownOption[];
};
