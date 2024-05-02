import { Controller, useFormContext } from 'react-hook-form';
import { IInputProps } from '../Input.types';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { InputStyles, StyledInputControl } from '../Input.styled';
import styled from 'styled-components';
import { InputControlLabel } from '../Input';
import { useRef } from 'react';
import { useOverflowed } from '@/lib/hooks/useOverflowed';
import { Tooltip } from '../../Tooltip';

export type INumberInputProps = Omit<IInputProps, 'inputElement'> & {
  numericFormatProps?: NumericFormatProps;
  onlyInteger?: boolean;
  max?: number;
  min?: number;
  readOnly?: boolean;
};

const StyledNumericFormat = styled.div`
  & > input {
    background-color: unset;
    ${InputStyles}
  }
`;

export const NumberInput = ({
  numericFormatProps = {},
  onlyInteger,
  max,
  min,
  readOnly,
  ...inputControlProps
}: INumberInputProps) => {
  const { control } = useFormContext();
  const { isAllowed, ...numericCustomProps } = numericFormatProps;
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const isOverflowed = useOverflowed({ ref: inputWrapperRef });
  return (
    <Controller
      control={control}
      name={inputControlProps.name}
      render={({
        field: { onBlur: _onBlur, ...fieldProps },
        fieldState: { error },
      }) => (
        <StyledInputControl hasError={Boolean(error?.message)}>
          <InputControlLabel error={error} {...inputControlProps} />
          <Tooltip
            content={`${inputControlProps.label}:\n${fieldProps.value ?? '-'}`}
            disableTooltip={!fieldProps.value || !isOverflowed}
          >
            <StyledNumericFormat ref={inputWrapperRef}>
              <NumericFormat
                style={{ direction: 'ltr' }}
                thousandSeparator
                allowNegative={false}
                isAllowed={(values) => {
                  const { floatValue, value } = values;
                  if (max !== undefined) {
                    return (floatValue ?? 0) <= max;
                  }
                  if (min !== undefined) {
                    return (floatValue ?? 0) >= min;
                  }
                  if (onlyInteger) {
                    return /^\d*$/.test(value);
                  }
                  return isAllowed?.(values) ?? true;
                }}
                readOnly={readOnly}
                {...numericCustomProps}
                {...fieldProps}
                onValueChange={({ floatValue }) => {
                  fieldProps.onChange(floatValue);
                }}
                onBlur={(e) => {
                  inputControlProps.afterChange?.(e.target.value);
                }}
              />
            </StyledNumericFormat>
          </Tooltip>
        </StyledInputControl>
      )}
    />
  );
};
