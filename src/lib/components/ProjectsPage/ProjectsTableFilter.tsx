import {
  IProjectDoc,
  ProjectFields,
  ProjectStatus,
} from '@/lib/consts/projects';
import {
  FilterPanel,
  IFilterItem,
  IFilterItemType,
} from '../commons/FilterPanel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import Z from 'zod';

const dateFilterSchema = Z.object({
  from: Z.coerce.date().optional(),
  to: Z.coerce.date().optional(),
});

const projectFilterSchema = Z.object({
  sDate: dateFilterSchema,
  eDate: dateFilterSchema,
});
export const ProjectFilterPanel = () => {
  const form = useForm<IProjectDoc>({
    resolver: zodResolver(projectFilterSchema),
    defaultValues: {
      sDate: { from: '', to: '' },
      eDate: { from: '', to: '' },
      status: [ProjectStatus.Active],
    },
    mode: 'onSubmit',
  });
  const filters: IFilterItem<ProjectFields>[] = [
    {
      type: IFilterItemType.Buttons,
      field: ProjectFields.Status,
    },
    {
      type: IFilterItemType.Date,
      field: ProjectFields.SDate,
    },
    {
      type: IFilterItemType.Date,
      field: ProjectFields.EDate,
    },
  ];
  return (
    <FormProvider {...form}>
      <FilterPanel filters={filters} />
    </FormProvider>
  );
};
