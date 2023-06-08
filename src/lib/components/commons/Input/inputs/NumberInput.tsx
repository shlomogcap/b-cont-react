import { useFormContext } from 'react-hook-form';
import { InputControl } from '../Input';
import { StyledInputField } from '../Input.styled';
import { IInputProps } from '../Input.types';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type INumberInputProps = Omit<IInputProps, 'inputElement'> & {
  numericFormatProps?: NumericFormatProps;
};

export const NumberInput = ({
  numericFormatProps = {},
  ...inputControlProps
}: INumberInputProps) => {
  const { setValue } = useFormContext();
  return (
    <div>
      <InputControl
        {...inputControlProps}
        inputElement={<input type='number' hidden />}
      />
      <NumericFormat
        thousandSeparator
        allowNegative={false}
        {...numericFormatProps}
        onChange={(e) =>
          setValue(
            inputControlProps.name,
            Number(e.target.value.replace(/,/g, '')),
            {
              shouldValidate: true,
            },
          )
        }
        customInput={(inputProps) => (
          <StyledInputField style={{ direction: 'ltr' }} {...inputProps} />
        )}
      />
    </div>
  );
};
