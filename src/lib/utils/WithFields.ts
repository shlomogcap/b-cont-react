import { ECommonFields } from '../consts/commonFields';

export type IWithIdField<T extends {}> = T & { [ECommonFields.Id]: string };

export type IWithCommonFields<T extends {}> = T & {
  [key in ECommonFields]?: string;
};
