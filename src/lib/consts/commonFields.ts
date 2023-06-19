import { TLang } from './displayTexts';

export enum ECommonFields {
  Id = 'id',
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  UpdatedAt = 'updatedAt',
  UpdatedBy = 'updatedBy',
}

type IDisplayTextMapping = Record<ECommonFields, string>;

export const COMMON_FIELDS_DISPLAY_TEXTS: Record<TLang, TDisplayTextMapping> = {
  he: {
    [ECommonFields.Id]: 'מזהה',
    [ECommonFields.CreatedAt]: 'נוצר ב',
    [ECommonFields.CreatedBy]: 'נוצר עי',
    [ECommonFields.UpdatedAt]: 'עודכן ב',
    [ECommonFields.UpdatedBy]: 'עודכן עי',
  },
  en: {
    [ECommonFields.Id]: 'ID',
    [ECommonFields.CreatedAt]: 'Created At',
    [ECommonFields.CreatedBy]: 'Created By',
    [ECommonFields.UpdatedAt]: 'Updated At',
    [ECommonFields.UpdatedBy]: 'Updated By',
  },
};
