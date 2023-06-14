import { OPTIONAL_DATE_SCHEMA } from '@/lib/consts/validation/validationSchema';
import Z from 'zod';
import { IFilterItem, IFilterItemType } from '../commons/FilterPanel';
import {
  IProjectStatus,
  PROJECT_DISPLAY_TEXTS,
  ProjectFields,
} from '@/lib/consts/projects';

export const dateFilterSchema = Z.object({
  from: OPTIONAL_DATE_SCHEMA,
  to: OPTIONAL_DATE_SCHEMA,
});

export const projectFilterSchema = Z.object({
  status: Z.array(Z.nativeEnum(IProjectStatus)),
  sDate: dateFilterSchema,
  eDate: dateFilterSchema,
});

export const projectsTableFilters: IFilterItem<ProjectFields>[] = [
  {
    type: IFilterItemType.Buttons,
    field: ProjectFields.Status,
    options: Object.values(IProjectStatus).map((value) => ({
      value,
      text: PROJECT_DISPLAY_TEXTS.he.projectStatus[value],
    })),
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
