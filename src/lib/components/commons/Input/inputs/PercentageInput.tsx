import { INumberInputProps, NumberInput } from './NumberInput';

export const PercentageInput = ({
  numericFormatProps = {},
  max = 100,
  min = 0,
  ...rest
}: INumberInputProps) => {
  return (
    <NumberInput
      {...rest}
      numericFormatProps={{ suffix: '%', min, max, ...numericFormatProps }}
    />
  );
};
