import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '@/lib/consts/projects';
import { useForm, FormProvider } from 'react-hook-form';
import { ProjectDoc, IProjectDoc } from '../../../consts/projects';
import { PROJECT_FORM_DEFAULT_VALUES } from '../../ProjectForm/ProjectForm.consts';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  StyledFilterPanel,
  StyledFilterControlDiv,
  StyledFilterButton,
  StyledFilterItemCaption,
} from './FilterPanel.styled';
import { IFilterPanelButtonProps } from './FilterPanel.types';
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

export const FilterPanel = () => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<Boolean>(false);
  const form = useForm<IProjectDoc>({
    resolver: zodResolver(ProjectDoc),
    defaultValues: PROJECT_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);
  const filterIconProps: ISvgIconProps = {
    //TODO: when filteres are active make color var(--color-active)}
    size: 'S',
    onClick: (e) => {
      setIsFilterPanelOpen((prev) => !prev);
    },
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popperElement.current &&
      !popperElement.current?.contains(event.target as Node) &&
      !(event.target instanceof SVGElement)
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
    <FilterIconOpen {...filterIconProps} />
  ) : (
    <FilterIconClose {...filterIconProps} />
  );

  return (
    <div ref={referenceElement}>
      <FormProvider {...form}>
        {filterIcon}
        {isFilterPanelOpen && (
          <StyledFilterPanel ref={popperElement}>
            <StyledFilterControlDiv>
              <StyledFilterItemCaption>
                {PROJECT_DISPLAY_TEXTS.he.fields.status}
              </StyledFilterItemCaption>
              <FilterPanelButton>
                {DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.Active]}
              </FilterPanelButton>
              <FilterPanelButton>
                {DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.InActive]}
              </FilterPanelButton>
            </StyledFilterControlDiv>

            <StyledFilterControlDiv>
              <StyledFilterItemCaption>
                {PROJECT_DISPLAY_TEXTS.he.fields.sDate}
              </StyledFilterItemCaption>
              <DateInput
                label={DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.From]}
                name={`${ProjectFields.SDate} sDateFilter`}
              ></DateInput>
              <DateInput
                label={DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.To]}
                name={`${ProjectFields.EDate} sDateFilter`}
              ></DateInput>
            </StyledFilterControlDiv>

            <StyledFilterControlDiv>
              <StyledFilterItemCaption>
                {PROJECT_DISPLAY_TEXTS.he.fields.eDate}
              </StyledFilterItemCaption>
              <DateInput
                label={DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.From]}
                name={`${ProjectFields.SDate} eDate`}
              ></DateInput>
              <DateInput
                label={DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.To]}
                name={`${ProjectFields.EDate} eDate`}
              ></DateInput>
            </StyledFilterControlDiv>
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
                  form.reset();
                }}
              >
                {DISPLAY_TEXTS.he.filterPanel[IFilterPanelStates.Clear]}
              </StyledFilterButton>
            </StyledFilterControlDiv>
          </StyledFilterPanel>
        )}
      </FormProvider>
    </div>
  );
};
