import { Controller, useFormContext } from 'react-hook-form';
import { StyledInputControl, StyledInputLabel } from './Input.styled';
import { IInputProps } from './Input.types';
import { AlertIcon } from '../../icons/AlertIcon';
import { Tooltip } from '../Tooltip';
import { HTMLProps, cloneElement, useRef } from 'react';
import { useOverflowed } from '@/lib/hooks/useOverflowed';

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
            <StyledInputLabel htmlFor={name}>
              {`${rest.label}${rest.isRequired ? ' *' : ''}`}
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
