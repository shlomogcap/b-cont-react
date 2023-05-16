import { InputControl } from '../Input';
import { StyledInputField } from '../Input.styled';
import { IInputProps } from '../Input.types';

export const TextInput = (props: Omit<IInputProps, 'inputElement'>) => (
  <InputControl {...props} inputElement={<StyledInputField />} />
);
