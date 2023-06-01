import { ICommonFields } from '../consts/commonFields';

export type WithIdField<T extends {}> = T & { [ICommonFields.Id]: string };

export type WithCommonFields<T extends {}> = T & {
  [key in ICommonFields]?: string;
};
