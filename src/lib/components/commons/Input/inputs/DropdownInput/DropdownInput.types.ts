import { IInputProps } from '../../Input.types';

type IDropdownOption = { text: string; value: number | string };
export type IDropdownInputProps = Omit<IInputProps, 'inputElement'> & {
  options: IDropdownOption[];
};
