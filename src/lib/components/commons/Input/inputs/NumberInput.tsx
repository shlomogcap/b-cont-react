import { InputControl } from '../Input';
import { StyledInputField } from '../Input.styled';
import { IInputProps } from '../Input.types';

export const NumberInput = (props: Omit<IInputProps, 'inputElement'>) => (
  <InputControl
    {...props}
    inputElement={
      <StyledInputField type='number' style={{ direction: 'ltr' }} />
    }
  />
);
