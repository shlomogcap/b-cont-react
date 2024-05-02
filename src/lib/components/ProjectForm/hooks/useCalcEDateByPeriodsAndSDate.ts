import { EProjectFields } from '@/lib/consts/projects';
import { useFormContext } from 'react-hook-form';
import { IProjectFormValues } from '../ProjectForm.types';
import dayjs from 'dayjs';

export const useCalcEDateByPeriodsAndSDate = () => {
  const { setValue, watch } = useFormContext<IProjectFormValues>();
  return () => {
    const [sDate, periods] = watch([
      EProjectFields.SDate,
      EProjectFields.NumberOfPeriods,
    ]);
    if (!sDate || !periods || periods < 0) {
      return;
    }
    setValue(
      EProjectFields.EDate,
      dayjs(sDate).add(Number(periods), 'months').format('YYYY-MM-DD'),
    );
  };
};
