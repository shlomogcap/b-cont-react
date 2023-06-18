import Z from 'zod';
import { IFilterItem, IFilterItemType } from '../commons/FilterPanel';
import {
  IProjectStatus,
  PROJECT_DISPLAY_TEXTS,
  ProjectFields,
  ProjectType,
} from '@/lib/consts/projects';
import { dateFilterSchema } from '../commons/FilterPanel/FilterPanel.consts';
import { fieldsNamesToColumns } from '../commons/Table';

export const projectFilterSchema = Z.object({
  [ProjectFields.Status]: Z.object({
    type: Z.literal(IFilterItemType.Buttons),
    value: Z.array(Z.nativeEnum(IProjectStatus)),
  }),
  [ProjectFields.SDate]: Z.object({
    type: Z.literal(IFilterItemType.Date),
    value: dateFilterSchema,
  }),
  [ProjectFields.EDate]: Z.object({
    type: Z.literal(IFilterItemType.Date),
    value: dateFilterSchema,
  }),
});

export const projectsTableFilters: IFilterItem<ProjectFields>[] = [
  {
    type: IFilterItemType.Buttons,
    field: ProjectFields.Status,
    options: Object.values(IProjectStatus).map((value) => ({
      value,
      text: PROJECT_DISPLAY_TEXTS.he.projectStatus[value],
    })),
    defaultValue: [IProjectStatus.Active],
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

export const projectsTableColumns = fieldsNamesToColumns(
  [
    ProjectFields.Title,
    {
      field: ProjectFields.ProjectType,
      type: 'list',
      options: [
        ProjectType.Residential,
        ProjectType.Entrepreneurship,
        ProjectType.PublicSpace,
      ].map((projectType) => ({
        text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType],
        value: projectType,
      })),
    },
    { field: ProjectFields.SDate, type: 'date' },
    { field: ProjectFields.EDate, type: 'date' },
    { field: ProjectFields.TotalAgreementSum, type: 'number' },
    { field: ProjectFields.TotalActualsSum, type: 'number' },
    ProjectFields.Address,
  ],
  PROJECT_DISPLAY_TEXTS.he.fields,
);
