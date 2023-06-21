import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { StyledInputControl, StyledInputLabel } from './Input.styled';
import { IInputProps } from './Input.types';
import { AlertIcon } from '../../icons/AlertIcon';
import { Tooltip } from '../Tooltip';
import { HTMLProps, cloneElement, useRef } from 'react';
import { useOverflowed } from '@/lib/hooks/useOverflowed';

export const InputControlLabel = ({
  name,
  label,
  error,
  isRequired,
  hideLabel,
}: Pick<IInputProps, 'name' | 'isRequired' | 'label' | 'hideLabel'> & {
  error?: FieldError;
}) => (
  <StyledInputLabel htmlFor={name}>
    {!hideLabel && `${label}${isRequired ? ' *' : ''}`}
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
);

export const InputControl = <T extends string = string>({
  name,
  inputElement,
  afterChange,
  ...rest
}: IInputProps<T>) => {
  const { control } = useFormContext();
  const inputRef = useRef<HTMLElement>(null);
  const isOverflowed = useOverflowed({ ref: inputRef });
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, ...fieldProps }, fieldState: { error } }) => {
        return (
          <StyledInputControl hasError={Boolean(error?.message)}>
            <InputControlLabel name={name} error={error} {...rest} />
            <Tooltip
              content={`${rest.label}:\n${fieldProps.value ?? '-'}`}
              disableTooltip={!fieldProps.value || !isOverflowed}
            >
              {cloneElement<HTMLProps<HTMLInputElement>>(inputElement, {
                id: name,
                ...fieldProps,
                ...rest,
                ...inputElement.props,
                onBlur: () => {
                  onBlur?.();
                  afterChange?.(fieldProps.value);
                },
                ref: inputRef,
              })}
            </Tooltip>
          </StyledInputControl>
        );
      }}
    />
  );
};
