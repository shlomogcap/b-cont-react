import { ILang } from './displayTexts';

export enum ECommonFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  UpdatedAt = 'updatedAt',
  UpdatedBy = 'updatedBy',
  Path = 'path',
}

type IDisplayTextMapping = Record<ECommonFields, string>;

export const COMMON_FIELDS_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    [ECommonFields.Id]: 'מזהה',
    [ECommonFields.CreatedAt]: 'נוצר ב',
    [ECommonFields.CreatedBy]: 'נוצר עי',
    [ECommonFields.UpdatedAt]: 'עודכן ב',
    [ECommonFields.UpdatedBy]: 'עודכן עי',
    [ECommonFields.Path]: 'נתיב',
  },
  en: {
    [ECommonFields.Id]: 'ID',
    [ECommonFields.CreatedAt]: 'Created At',
    [ECommonFields.CreatedBy]: 'Created By',
    [ECommonFields.UpdatedAt]: 'Updated At',
    [ECommonFields.UpdatedBy]: 'Updated By',
    [ECommonFields.Path]: 'Path',
  },
};
