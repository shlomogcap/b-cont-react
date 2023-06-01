import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '@/lib/consts/projects';
import { useFormContext } from 'react-hook-form';
import {
  StyledFilterPanel,
  StyledFilterControlDiv,
  StyledFilterButton,
  StyledFilterItemCaption,
} from './FilterPanel.styled';
import {
  IFilterPanelButtonProps,
  IFilterPanelProps,
} from './FilterPanel.types';
import { DateInput } from '../Input/inputs/DateInput';
import { FilterIconClose, FilterIconOpen } from '../../icons';
import { DISPLAY_TEXTS, IFilterPanelStates } from '@/lib/consts/displayTexts';
import { ISvgIconProps } from '../../icons/SvgIcon';
import { createPopper, Instance } from '@popperjs/core';

const FilterPanelButton = ({
  children,
}: PropsWithChildren<IFilterPanelButtonProps>) => {
  const [isFiltered, setIsFiltered] = useState(false);
  return (
    <StyledFilterButton
      isButtonGroup
      variant={isFiltered ? 'primary' : 'secondary'}
      onClick={() => setIsFiltered((prev) => !prev)}
    >
      {children}
    </StyledFilterButton>
  );
};

export const FilterPanel = ({ filters }: IFilterPanelProps) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const referenceElement = useRef<SVGSVGElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);
  const { reset } = useFormContext();

  const filterIconProps: ISvgIconProps = {
    //TODO: when filteres are active make color var(--color-active)}
    size: 'S',
    onClick: (e) => {
      e.stopPropagation();
      setIsFilterPanelOpen((prev) => !prev);
    },
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popperElement.current &&
      !popperElement.current?.contains(event.target as Node) &&
      !referenceElement.current?.contains(event.target as Node)
    ) {
      setIsFilterPanelOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const initPopper = useCallback(() => {
    if (
      isFilterPanelOpen &&
      referenceElement.current &&
      popperElement.current
    ) {
      popperInstance.current = createPopper(
        referenceElement.current,
        popperElement.current,
        {
          placement: 'bottom-end',
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
  }, [isFilterPanelOpen]);

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

  const filterIcon = isFilterPanelOpen ? (
    <FilterIconOpen ref={referenceElement} {...filterIconProps} />
  ) : (
    <FilterIconClose ref={referenceElement} {...filterIconProps} />
  );

  return (
    <div>
      {filterIcon}
      {isFilterPanelOpen && (
        <StyledFilterPanel ref={popperElement}>
          {filters.map(({ type, field }) => {
            {
              if (type === 'buttons')
                return (
                  <StyledFilterControlDiv>
                    <StyledFilterItemCaption>
                      {PROJECT_DISPLAY_TEXTS.he.fields.status}
                    </StyledFilterItemCaption>
                    <FilterPanelButton>
                      {DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.Active]}
                    </FilterPanelButton>
                    <FilterPanelButton>
                      {
                        DISPLAY_TEXTS.he.filterPanel[
                          IFilterPanelStates.InActive
                        ]
                      }
                    </FilterPanelButton>
                  </StyledFilterControlDiv>
                );
            }
            {
              if (type === 'date')
                return (
                  <StyledFilterControlDiv>
                    <StyledFilterItemCaption>
                      {field === 'sDate'
                        ? PROJECT_DISPLAY_TEXTS.he.fields.sDate
                        : PROJECT_DISPLAY_TEXTS.he.fields.eDate}
                    </StyledFilterItemCaption>
                    <DateInput
                      label={
                        DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.From]
                      }
                      name={`${field}.from`}
                    ></DateInput>
                    <DateInput
                      label={
                        DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.To]
                      }
                      name={`${field}.to `}
                    ></DateInput>
                  </StyledFilterControlDiv>
                );
            }
          })}
          <StyledFilterControlDiv justify='flex-end'>
            <StyledFilterButton
              width='25%'
              variant='primary'
              onClick={() => setIsFilterPanelOpen(false)}
            >
              {DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.Filter]}
            </StyledFilterButton>
            <StyledFilterButton
              width='20%'
              variant='danger'
              onClick={() => {
                setIsFilterPanelOpen(false);
                reset();
              }}
            >
              {DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.Clear]}
            </StyledFilterButton>
          </StyledFilterControlDiv>
        </StyledFilterPanel>
      )}
    </div>
  );
};
