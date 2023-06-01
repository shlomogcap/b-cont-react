import { CommonFields } from '../consts/commonFields';

export type WithIdField<T extends {}> = T & { [CommonFields.Id]: string };

export type WithCommonFields<T extends {}> = T & {
  [key in CommonFields]?: string;
};
