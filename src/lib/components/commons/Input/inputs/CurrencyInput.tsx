import { INumberInputProps, NumberInput } from './NumberInput';

export const CurrencyInput = ({
  numericFormatProps = {},
  ...rest
}: INumberInputProps) => {
  return (
    <NumberInput
      {...rest}
      numericFormatProps={{ suffix: ' ₪', ...numericFormatProps }}
    />
  );
};
