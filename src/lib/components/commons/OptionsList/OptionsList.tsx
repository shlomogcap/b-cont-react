import { IOptionsListProps } from './OptionsList.types';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import { Instance, createPopper } from '@popperjs/core';
import {
  StyledList,
  StyledListItem,
  StyledOptionsListWrapper,
} from './OptionsList.styled';
import {
  OptionsListProvider,
  useOptionsListContext,
} from './OptionsList.provider';

export const OptionsList = (props: PropsWithChildren<IOptionsListProps>) => {
  return (
    <OptionsListProvider>
      <OptionsListInner {...props} />
    </OptionsListProvider>
  );
};

const OptionsListInner = ({
  options,
  children,
}: PropsWithChildren<IOptionsListProps>) => {
  const listId = useId();
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);
  const { isListOpen, closeList, toggleList } = useOptionsListContext();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popperElement.current &&
      !popperElement.current?.contains(event.target as Node) &&
      !referenceElement.current?.contains(event.target as Node)
    ) {
      closeList();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

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
    <StyledOptionsListWrapper
      ref={referenceElement}
      aria-haspopup='true'
      aria-expanded={Boolean(isListOpen)}
      onClick={toggleList}
      id={listId}
    >
      {children}
      {isListOpen && (
        <StyledList ref={popperElement} aria-labelledby={listId}>
          {options.map(({ value, text, onOptionClick }) => (
            <StyledListItem
              key={String(value)}
              data-value={value}
              onClick={() => onOptionClick({ value })}
            >
              {text}
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </StyledOptionsListWrapper>
  );
};
