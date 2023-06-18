import { ICommonFields } from '../consts/commonFields';

export type TWithIdField<T extends {}> = T & { [ICommonFields.Id]: string };

export type TWithCommonFields<T extends {}> = T & {
  [key in ICommonFields]?: string;
};
