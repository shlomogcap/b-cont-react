import Z from 'zod';
import { IFilterItem, EFilterItemType } from '../commons/FilterPanel';
import {
  EProjectStatus,
  PROJECT_DISPLAY_TEXTS,
  EProjectFields,
  EProjectType,
} from '@/lib/consts/projects';
import { dateFilterSchema } from '../commons/FilterPanel/FilterPanel.consts';
import { fieldsNamesToColumns } from '../commons/Table';

export const projectFilterSchema = Z.object({
  [EProjectFields.Status]: Z.object({
    type: Z.literal(EFilterItemType.Buttons),
    value: Z.array(Z.nativeEnum(EProjectStatus)),
  }),
  [EProjectFields.SDate]: Z.object({
    type: Z.literal(EFilterItemType.Date),
    value: dateFilterSchema,
  }),
  [EProjectFields.EDate]: Z.object({
    type: Z.literal(EFilterItemType.Date),
    value: dateFilterSchema,
  }),
});

export const projectsTableFilters: IFilterItem<EProjectFields>[] = [
  {
    type: EFilterItemType.Buttons,
    field: EProjectFields.Status,
    options: Object.values(EProjectStatus).map((value) => ({
      value,
      text: PROJECT_DISPLAY_TEXTS.he.projectStatus[value],
    })),
    defaultValue: [EProjectStatus.Active],
  },
  {
    type: EFilterItemType.Date,
    field: EProjectFields.SDate,
  },
  {
    type: EFilterItemType.Date,
    field: EProjectFields.EDate,
  },
];

export const projectsTableColumns = fieldsNamesToColumns(
  [
    EProjectFields.Title,
    {
      field: EProjectFields.ProjectType,
      type: 'list',
      options: [
        EProjectType.Residential,
        EProjectType.Entrepreneurship,
        EProjectType.PublicSpace,
      ].map((projectType) => ({
        text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType],
        value: projectType,
      })),
    },
    { field: EProjectFields.SDate, type: 'date' },
    { field: EProjectFields.EDate, type: 'date' },
    { field: EProjectFields.TotalAgreementSum, type: 'number' },
    { field: EProjectFields.TotalActualsSum, type: 'number' },
    EProjectFields.Address,
  ],
  PROJECT_DISPLAY_TEXTS.he.fields,
);

export const projectTableSearchFields = [
  EProjectFields.Title,
  EProjectFields.ProjectType,
  EProjectFields.Address,
];
