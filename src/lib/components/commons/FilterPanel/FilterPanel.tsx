import { useState } from 'react';
import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '@/lib/consts/projects';
import { useForm, FormProvider } from 'react-hook-form';
import { ProjectFormValues } from '../../ProjectForm';
import { projectFormSchema } from '../../ProjectForm/ProjectForm.consts';
import { PROJECT_FORM_DEFAULT_VALUES } from '../../ProjectForm/ProjectForm.consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { SvgIcon } from '../../icons/SvgIcon';
import {
  StyledFilterPanel,
  StyledFilterControlDiv,
  StyledFilterButton,
} from './FilterPanel.styled';
import { StatusState } from './FilterPanel.types';
import { DateInput } from '../Input/inputs/DateInput';

export const FilterPanel = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState<StatusState>('cancel');

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: PROJECT_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });

  return (
    <>
      <SvgIcon
        size='S'
        onClick={() => {
          setShowFilters(!showFilters);
        }}
      >
        <use
          href={`/img/icons.svg#icon-filter-${showFilters ? 'open' : 'close'}`}
        ></use>
      </SvgIcon>

      <FormProvider {...form}>
        {showFilters && (
          <StyledFilterPanel>
            <StyledFilterControlDiv>
              <p style={{ flexBasis: '100%' }}>
                {PROJECT_DISPLAY_TEXTS.he.fields.status}
              </p>
              <StyledFilterButton
                isButtonGroup={true}
                variant={
                  status === 'cancel'
                    ? 'secondary'
                    : status
                    ? 'primary'
                    : 'secondary'
                }
                onClick={() =>
                  setStatus(!status ? true : status === true ? 'cancel' : true)
                }
              >
                פעיל
              </StyledFilterButton>
              <StyledFilterButton
                isButtonGroup={true}
                variant={
                  status === 'cancel'
                    ? 'secondary'
                    : !status
                    ? 'primary'
                    : 'secondary'
                }
                onClick={() =>
                  setStatus(
                    status ? false : status === false ? 'cancel' : false,
                  )
                }
              >
                לא פעיל
              </StyledFilterButton>
            </StyledFilterControlDiv>

            <StyledFilterControlDiv>
              <p style={{ flexBasis: '100%' }}>
                {PROJECT_DISPLAY_TEXTS.he.fields.sDate}
              </p>
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
              <p style={{ flexBasis: '100%' }}>
                {PROJECT_DISPLAY_TEXTS.he.fields.eDate}
              </p>
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
                onClick={() => setShowFilters(!showFilters)}
              >
                סנן
              </StyledFilterButton>
              <StyledFilterButton
                width='20%'
                variant='danger'
                onClick={() => {
                  setStatus('cancel');
                  form.reset();
                }}
              >
                נקה
              </StyledFilterButton>
            </StyledFilterControlDiv>
          </StyledFilterPanel>
        )}
      </FormProvider>
    </>
  );
};
