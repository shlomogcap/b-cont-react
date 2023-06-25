import { EProjectFields } from '@/lib/consts/projects';
import { useFormContext, useWatch } from 'react-hook-form';
import { IProjectFormValues } from '../ProjectForm.types';
import dayjs from 'dayjs';

export const useCalcPeriods = () => {
  const { setValue, watch } = useFormContext<IProjectFormValues>();
  return () => {
    const [sDate, eDate] = watch([EProjectFields.SDate, EProjectFields.EDate]);
    if (!sDate || !eDate) {
      return;
    }
    const diffMonths = dayjs(eDate).diff(sDate, 'months');
    setValue(EProjectFields.NumberOfPeriods, diffMonths);
  };
};
