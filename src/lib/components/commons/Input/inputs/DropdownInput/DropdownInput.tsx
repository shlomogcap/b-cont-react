import { InputControl } from '../../Input';
import {
  StyledDropdownField,
  StyledDropdownTag,
  StyledRemoveIcon,
} from './DropdownInput.styled';
import { IDropdownInputProps } from './DropdownInput.types';
import { useFormContext, useWatch } from 'react-hook-form';
import { TriangleArrowIcon } from '@/lib/components/icons/TriangleArrowIcon';
import { OptionsList } from '../../../OptionsList';
import { useOptionsListContext } from '../../../OptionsList/OptionsList.provider';

const TriangleArrow = () => {
  const { isListOpen } = useOptionsListContext();
  return (
    <TriangleArrowIcon
      direction={isListOpen ? 'up' : 'down'}
      style={{ color: 'var(--color-non-active)', cursor: 'pointer' }}
    />
  );
};

export const DropdownInput = ({ options, ...props }: IDropdownInputProps) => {
  const { setValue } = useFormContext();
  const currentValue = useWatch({ name: props.name });
  const displayValue =
    options.find(({ value }) => value === currentValue)?.text ?? '';

  return (
    <OptionsList
      options={options.map((o) => ({
        ...o,
        onOptionClick: ({ value }) =>
          setValue(props.name, value, { shouldDirty: true }),
      }))}
    >
      <InputControl {...props} inputElement={<input hidden />} />
      <StyledDropdownField readOnly={props.readOnly}>
        <StyledDropdownTag>
          {displayValue}
          {displayValue && (
            <StyledRemoveIcon
              onClick={(e) => {
                e.stopPropagation();
                setValue(props.name, '');
              }}
              style={{ color: 'var(--color-non-active)', cursor: 'pointer' }}
            />
          )}
        </StyledDropdownTag>
        <TriangleArrow />
      </StyledDropdownField>
    </OptionsList>
  );
};
