import { PropsWithChildren, useState } from 'react';
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
import { DISPLAY_TEXTS, IFilterButtonStates } from '@/lib/consts/displayTexts';
import { ISvgIconProps } from '../../icons/SvgIcon';

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
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const form = useForm<IProjectDoc>({
    resolver: zodResolver(ProjectDoc),
    defaultValues: PROJECT_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const filterIconProps: ISvgIconProps = {
    //TODO: when filteres are active make color var(--color-active)}
    size: 'S',
    onClick: () => {
      setIsFilterPanelOpen((prev) => !prev);
    },
  };
  const filterIcon = isFilterPanelOpen ? (
    <FilterIconOpen {...filterIconProps} />
  ) : (
    <FilterIconClose {...filterIconProps} />
  );

  return (
    <div>
      <FormProvider {...form}>
        {filterIcon}
        {isFilterPanelOpen && (
          <StyledFilterPanel>
            <StyledFilterControlDiv>
              <StyledFilterItemCaption>
                {PROJECT_DISPLAY_TEXTS.he.fields.status}
              </StyledFilterItemCaption>
              <FilterPanelButton>
                {DISPLAY_TEXTS.he.filterButton[IFilterButtonStates.Active]}
              </FilterPanelButton>
              <FilterPanelButton>
                {DISPLAY_TEXTS.he.filterButton[IFilterButtonStates.InActive]}
              </FilterPanelButton>
            </StyledFilterControlDiv>

            <StyledFilterControlDiv>
              <StyledFilterItemCaption>
                {PROJECT_DISPLAY_TEXTS.he.fields.sDate}
              </StyledFilterItemCaption>
              <DateInput
                label={'מ'}
                name={`${ProjectFields.SDate} sDateFilter`}
              ></DateInput>
              <DateInput
                label={'עד'}
                name={`${ProjectFields.EDate} sDateFilter`}
              ></DateInput>
            </StyledFilterControlDiv>

            <StyledFilterControlDiv>
              <StyledFilterItemCaption>
                {PROJECT_DISPLAY_TEXTS.he.fields.eDate}
              </StyledFilterItemCaption>
              <DateInput
                label={'מ'}
                name={`${ProjectFields.SDate} eDate`}
              ></DateInput>
              <DateInput
                label={'עד'}
                name={`${ProjectFields.EDate} eDate`}
              ></DateInput>
            </StyledFilterControlDiv>
            <StyledFilterControlDiv justify='flex-end'>
              <StyledFilterButton
                width='25%'
                variant='primary'
                onClick={() => setIsFilterPanelOpen(false)}
              >
                סנן
              </StyledFilterButton>
              <StyledFilterButton
                width='20%'
                variant='danger'
                onClick={() => {
                  setIsFilterPanelOpen(false);
                  form.reset();
                }}
              >
                נקה
              </StyledFilterButton>
            </StyledFilterControlDiv>
          </StyledFilterPanel>
        )}
      </FormProvider>
    </div>
  );
};
