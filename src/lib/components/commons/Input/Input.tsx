import { Controller, useFormContext } from 'react-hook-form';
import {
  StyledInputControl,
  StyledInputField,
  StyledInputLabel,
} from './Input.styled';
import { IInputProps } from './Input.types';
import { AlertIcon } from '../../icons/AlertIcon';
import { Tooltip } from '../Tooltip';

export const InputControl = ({ name, ...rest }: IInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <StyledInputControl hasError={Boolean(error?.message)}>
            <StyledInputLabel htmlFor={name}>
              {rest.label}
              {error?.message && (
                <Tooltip content={error.message}>
                  <AlertIcon
                    style={{
                      color: 'var(--color-red-trs)',
                    }}
                  />
                </Tooltip>
              )}
            </StyledInputLabel>
            <StyledInputField {...field} {...rest} id={name} />
          </StyledInputControl>
        );
      }}
    />
  );
};
