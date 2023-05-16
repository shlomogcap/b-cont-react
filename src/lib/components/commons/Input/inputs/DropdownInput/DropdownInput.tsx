import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { InputControl } from '../../Input';
import {
  StyledDropdownField,
  StyledDropdownInput,
  StyledDropdownList,
  StyledDropdownListItem,
  StyledDropdownTag,
  StyledRemoveIcon,
} from './DropdownInput.styled';
import { IDropdownInputProps } from './DropdownInput.types';
import { Instance, createPopper } from '@popperjs/core';
import { useFormContext, useWatch } from 'react-hook-form';
import { TriangleArrowIcon } from '@/lib/components/icons/TriangleArrowIcon';

export const DropdownInput = ({ options, ...props }: IDropdownInputProps) => {
  const { setValue } = useFormContext();
  const [isListOpen, setIsListOpen] = useState<Boolean>(false);
  const listId = useId();
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);

  const currentValue = useWatch({ name: props.name });
  const displayValue =
    options.find(({ value }) => value === currentValue)?.text ?? '';

  const toggleList = () => setIsListOpen((prevState) => !prevState);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popperElement.current &&
      !popperElement.current?.contains(event.target as Node) &&
      !referenceElement.current?.contains(event.target as Node)
    ) {
      setIsListOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const initPopper = useCallback(() => {
    if (isListOpen && referenceElement.current && popperElement.current) {
      popperInstance.current = createPopper(
        referenceElement.current,
        popperElement.current,
        {
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
              },
            },
          ],
        },
      );
    }
  }, [isListOpen]);

  const destroyPopper = () => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
      popperInstance.current = null;
    }
  };

  useEffect(() => {
    initPopper();
    return () => destroyPopper();
  }, [initPopper]);
  return (
    <StyledDropdownInput
      ref={referenceElement}
      aria-haspopup='true'
      aria-expanded={Boolean(isListOpen)}
      onClick={toggleList}
      id={listId}
    >
      <InputControl {...props} inputElement={<input hidden />} />
      <StyledDropdownField>
        <StyledDropdownTag>
          {displayValue}
          {displayValue && (
            <StyledRemoveIcon
              onClick={() => setValue(props.name, '')}
              style={{ color: 'var(--color-non-active)', cursor: 'pointer' }}
            />
          )}
        </StyledDropdownTag>
        <TriangleArrowIcon
          direction={isListOpen ? 'up' : 'down'}
          style={{ color: 'var(--color-non-active)', cursor: 'pointer' }}
        />
      </StyledDropdownField>
      {isListOpen && (
        <StyledDropdownList ref={popperElement} aria-labelledby={listId}>
          {options.map(({ value, text }) => (
            <StyledDropdownListItem
              key={value}
              data-value={value}
              onClick={() => setValue(props.name, value, { shouldDirty: true })}
            >
              {text}
            </StyledDropdownListItem>
          ))}
        </StyledDropdownList>
      )}
    </StyledDropdownInput>
  );
};
