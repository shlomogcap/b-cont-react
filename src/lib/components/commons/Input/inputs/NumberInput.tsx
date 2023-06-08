import { useFormContext } from 'react-hook-form';
import { InputControl } from '../Input';
import { StyledInputField } from '../Input.styled';
import { IInputProps } from '../Input.types';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type INumberInputProps = Omit<IInputProps, 'inputElement'> & {
  numericFormatProps?: NumericFormatProps;
  onlyInteger?: boolean;
  max?: number;
  min?: number;
};

export const NumberInput = ({
  numericFormatProps = {},
  onlyInteger,
  max,
  min,
  ...inputControlProps
}: INumberInputProps) => {
  const { setValue } = useFormContext();
  const { isAllowed, ...numericCustomProps } = numericFormatProps;
  return (
    <div>
      <InputControl
        {...inputControlProps}
        inputElement={<input type='number' hidden />}
      />
      <NumericFormat
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
        {...numericCustomProps}
        onValueChange={({ floatValue }) => {
          setValue(inputControlProps.name, floatValue, {
            shouldValidate: true,
          });
        }}
        customInput={(inputProps) => (
          <StyledInputField style={{ direction: 'ltr' }} {...inputProps} />
        )}
      />
    </div>
  );
};
