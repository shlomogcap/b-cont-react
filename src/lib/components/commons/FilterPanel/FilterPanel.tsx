import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  PROJECT_DISPLAY_TEXTS,
  IFilterPanelStates,
} from '@/lib/consts/projects';
import { useFormContext } from 'react-hook-form';
import {
  StyledFilterPanel,
  StyledFilterControlDiv,
  StyledFilterButton,
  StyledFilterItemCaption,
} from './FilterPanel.styled';
import {
  IFilterItemOption,
  IFilterPanelButtonProps,
  IFilterPanelProps,
} from './FilterPanel.types';
import { DateInput } from '../Input/inputs/DateInput';
import { FilterIconClose, FilterIconOpen } from '../../icons';
import { ISvgIconProps } from '../../icons/SvgIcon';
import { createPopper, Instance } from '@popperjs/core';

const FilterPanelButton = ({
  field,
  children,
  currentValue,
}: PropsWithChildren<IFilterPanelButtonProps>) => {
  const { setValue, watch } = useFormContext();
  const fieldValues: string[] = watch(field) ?? [];
  const isActive = fieldValues.includes(currentValue);
  return (
    <StyledFilterButton
      isButtonGroup
      onClick={() => {
        setValue(
          field,
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
type IFilterButtonsControlProps<T extends string = string> = {
  label: string;
  field: string;
  options: IFilterItemOption<T>[];
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

const FilterDatesControl = ({
  label,
  field,
}: {
  label: string;
  field: string;
}) => (
  <StyledFilterControlDiv>
    <StyledFilterItemCaption>{label}</StyledFilterItemCaption>
    <DateInput
      label={PROJECT_DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.From]}
      name={`${field}.from`}
    />
    <DateInput
      label={PROJECT_DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.To]}
      name={`${field}.to`}
    />
  </StyledFilterControlDiv>
);

export const FilterPanel = ({ filters, displayTexts }: IFilterPanelProps) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const referenceElement = useRef<SVGSVGElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);
  const { reset, watch, formState } = useFormContext();
  const filterIconProps: ISvgIconProps = {
    size: 'M',
    isFiltersActive: formState.isDirty || Boolean(watch('status').length),
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
          {filters.map(({ type, field, options = [] }) => {
            const label: string = displayTexts[field];
            switch (type) {
              case 'buttons':
                return (
                  <FilterButtonsControl
                    label={label}
                    field={field}
                    options={options}
                  />
                );
              case 'date':
                return <FilterDatesControl label={label} field={field} />;
              default:
                return null;
            }
          })}
          <StyledFilterControlDiv justify='flex-end'>
            <StyledFilterButton
              width='25%'
              variant='primary'
              onClick={() => setIsFilterPanelOpen(false)}
            >
              {PROJECT_DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.Filter]}
            </StyledFilterButton>
            <StyledFilterButton
              width='20%'
              variant='danger'
              onClick={() => {
                setIsFilterPanelOpen(false);
                reset();
              }}
            >
              {PROJECT_DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.Clear]}
            </StyledFilterButton>
          </StyledFilterControlDiv>
        </StyledFilterPanel>
      )}
    </div>
  );
};
