import { Lang } from './displayTexts';

export enum ICommonFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  UpdatedAt = 'updatedAt',
  UpdatedBy = 'updatedBy',
}

type IDisplayTextMapping = Record<ICommonFields, string>;

export const COMMON_FIELDS_DISPLAY_TEXTS: Record<Lang, IDisplayTextMapping> = {
  he: {
    [ICommonFields.Id]: 'מזהה',
    [ICommonFields.CreatedAt]: 'נוצר ב',
    [ICommonFields.CreatedBy]: 'נוצר עי',
    [ICommonFields.UpdatedAt]: 'עודכן ב',
    [ICommonFields.UpdatedBy]: 'עודכן עי',
  },
  en: {
    [ICommonFields.Id]: 'ID',
    [ICommonFields.CreatedAt]: 'Created At',
    [ICommonFields.CreatedBy]: 'Created By',
    [ICommonFields.UpdatedAt]: 'Updated At',
    [ICommonFields.UpdatedBy]: 'Updated By',
  },
};
