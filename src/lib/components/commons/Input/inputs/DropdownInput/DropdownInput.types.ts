import { IInputProps } from '../../Input.types';

type IDropdownOption = { text: string; value: number | string | boolean };
export type IDropdownInputProps = Omit<IInputProps, 'inputElement'> & {
  options: IDropdownOption[];
};
