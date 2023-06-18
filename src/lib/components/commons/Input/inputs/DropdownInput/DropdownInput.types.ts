import { IInputProps } from '../../Input.types';

type TDropdownOption = { text: string; value: number | string | boolean };
export type TDropdownInputProps = Omit<IInputProps, 'inputElement'> & {
  options: IDropdownOption[];
};
