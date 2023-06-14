import { OPTIONAL_DATE_SCHEMA } from '@/lib/consts/validation/validationSchema';
import Z from 'zod';
import { IFilterItem, IFilterItemType } from '../commons/FilterPanel';
import {
  IProjectStatus,
  PROJECT_DISPLAY_TEXTS,
  ProjectFields,
} from '@/lib/consts/projects';
import { dateFilterSchema } from '../commons/FilterPanel/FilterPanel.consts';

export const projectFilterSchema = Z.object({
  [ProjectFields.Status]: Z.array(Z.nativeEnum(IProjectStatus)),
  [ProjectFields.SDate]: dateFilterSchema,
  [ProjectFields.EDate]: dateFilterSchema,
});

export const projectsTableFilters: IFilterItem<ProjectFields>[] = [
  {
    type: IFilterItemType.Buttons,
    field: ProjectFields.Status,
    options: Object.values(IProjectStatus).map((value) => ({
      value,
      text: PROJECT_DISPLAY_TEXTS.he.projectStatus[value],
    })) as any /*TODO: fix that generic issue*/,
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
