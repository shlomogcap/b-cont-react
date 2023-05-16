import { ProjectFields } from '@/lib/consts/projects';
import { useFormContext } from 'react-hook-form';
import { ProjectFormValues } from '../ProjectForm.types';
import dayjs from 'dayjs';

export const useCalcEDateByPeriodsAndSDate = () => {
  const { setValue, watch } = useFormContext<ProjectFormValues>();
  return () => {
    const [sDate, periods] = watch([
      ProjectFields.SDate,
      ProjectFields.NumberOfPeriods,
    ]);
    if (!sDate || !periods || periods < 0) {
      return;
    }
    setValue(
      ProjectFields.EDate,
      dayjs(sDate).add(Number(periods), 'months').toDate(),
    );
  };
};
