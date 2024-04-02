import { ECommonFields } from '../consts/commonFields';

export type IWithIdField<T extends {}> = T & { [ECommonFields.Id]: string };

export type IWithCommonFields<T extends {}> = T & {
  [key in ECommonFields]?: string;
};

export type IWithCreationFields<T extends {}> = Omit<
  T,
  ECommonFields.Id | ECommonFields.Path
>;
