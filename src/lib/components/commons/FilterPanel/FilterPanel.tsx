import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import {
  StyledFilterPanel,
  StyledFilterControlDiv,
  StyledFilterButton,
  StyledFilterItemCaption,
  StyledFiltersBar,
} from './FilterPanel.styled';
import {
  IFilterButtonsControlProps,
  IFilterDatesControlProps,
  EFilterItemType,
  IFilterPanelButtonProps,
  IFilterPanelProps,
} from './FilterPanel.types';
import { DateInput } from '../Input/inputs/DateInput';
import { FilterIconClose, FilterIconOpen } from '../../icons';
import { ISvgIconProps } from '../../icons/SvgIcon';
import { createPopper, Instance } from '@popperjs/core';
import { Badge } from '../Badge';
import { DISPLAY_TEXTS, EFilterPanelStates } from '@/lib/consts/displayTexts';
import Draggable from 'react-draggable';
import { SearchBar } from '../SearchBar';

const FilterPanelButton = ({
  field,
  children,
  currentValue,
}: PropsWithChildren<IFilterPanelButtonProps>) => {
  const { setValue, watch } = useFormContext();
  const fieldValuePath = `${field}.value`;
  const fieldValues: string[] = watch(fieldValuePath) ?? [];
  const isActive = fieldValues?.includes(currentValue);
  return (
    <StyledFilterButton
      isButtonGroup
      onClick={() => {
        setValue(
          fieldValuePath,
          isActive
            ? fieldValues.filter((value) => value !== currentValue)
            : [...fieldValues, currentValue],
        );
      }}
      variant={isActive ? 'primary' : 'secondary'}
    >
      {children}
    </StyledFilterButton>
  );
};

const FilterButtonsControl = ({
  label,
  field,
  options,
}: IFilterButtonsControlProps) => {
  return (
    <StyledFilterControlDiv>
      <StyledFilterItemCaption>{label}</StyledFilterItemCaption>
      {options.map(({ value, text }) => (
        <FilterPanelButton key={value} field={field} currentValue={value}>
          {text}
        </FilterPanelButton>
      ))}
    </StyledFilterControlDiv>
  );
};

const FilterDatesControl = ({ label, field }: IFilterDatesControlProps) => (
  <StyledFilterControlDiv>
    <StyledFilterItemCaption>{label}</StyledFilterItemCaption>
    <DateInput
      label={DISPLAY_TEXTS.he.filterPanel[EFilterPanelStates.From]}
      name={`${field}.value.from`}
    />
    <DateInput
      label={DISPLAY_TEXTS.he.filterPanel[EFilterPanelStates.To]}
      name={`${field}.value.to`}
    />
  </StyledFilterControlDiv>
);

export const FilterPanel = ({
  filters,
  displayTexts,
  activeFilters,
  // setSearchValue,
  // searchValue,
  searchProps,
}: IFilterPanelProps) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const referenceElement = useRef<SVGSVGElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);
  const { reset, formState } = useFormContext();
  const isFiltersActive = Object.values(activeFilters).some(
    (value) => value === true,
  );
  const filterIconProps: ISvgIconProps = {
    size: 'M',
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
      <StyledFiltersBar>
        {isFiltersActive && <Badge />}
        {filterIcon}
        <SearchBar searchProps={searchProps} />
      </StyledFiltersBar>
      {isFilterPanelOpen && (
        <Draggable>
          <StyledFilterPanel ref={popperElement}>
            {filters.map(({ type, field, options = [] }) => {
              const label: string = displayTexts[field];
              switch (type) {
                case EFilterItemType.Buttons:
                  return (
                    <FilterButtonsControl
                      label={label}
                      field={field}
                      options={options}
                    />
                  );
                case EFilterItemType.Date:
                  return <FilterDatesControl label={label} field={field} />;
                default:
                  return null;
              }
            })}
            <StyledFilterControlDiv justify='flex-end'>
              <StyledFilterButton
                width='25%'
                variant='primary'
                onClick={() => {
                  setIsFilterPanelOpen(false);
                }}
              >
                {DISPLAY_TEXTS.he.filterPanel[EFilterPanelStates.Close]}
              </StyledFilterButton>
              <StyledFilterButton
                width='20%'
                variant='danger'
                onClick={() => {
                  setIsFilterPanelOpen(false);
                  reset(formState.defaultValues);
                }}
              >
                {DISPLAY_TEXTS.he.filterPanel[EFilterPanelStates.Reset]}
              </StyledFilterButton>
            </StyledFilterControlDiv>
          </StyledFilterPanel>
        </Draggable>
      )}
    </div>
  );
};
