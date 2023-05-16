import { useWatch } from 'react-hook-form';
import { InputControl } from '../Input';
import { StyledInputField } from '../Input.styled';
import { IInputProps } from '../Input.types';
import dayjs from 'dayjs';

export const DateInput = (props: Omit<IInputProps, 'inputElement'>) => {
  const value = useWatch({ name: props.name });
  return (
    <InputControl
      {...props}
      inputElement={
        <StyledInputField
          type='date'
          style={{ textAlign: 'center' }}
          value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
        />
      }
    />
  );
};
