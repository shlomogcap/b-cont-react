// import { IProjectStatus } from '@/lib/consts/projects';

import { IProjectStatus, ProjectFields } from '@/lib/consts/projects';

export enum IFilterItemType {
  Date = 'date',
  Buttons = 'buttons',
}

export type IFilterItemOption<T extends string = string> = {
  text: string;
  value: T;
};

export type IFilterItem<T extends string = string> = {
  type: IFilterItemType;
  field: T;
  options?: IFilterItemOption<T>[];
};

export type IFilterPanelProps<T extends string = string> = {
  filters: IFilterItem<T>[];
  displayTexts: Record<T, string>;
  status: any;
  activeFilters: any;
};
export type IFilterPanelButtonProps<
  T extends string = string,
  V extends string = string,
> = {
  field: T;
  currentValue: V;
};

export type IStatusState = 'active' | 'not-active' | 'cancel';

export type IStyledFilterProps = {
  isFiltered?: boolean;
  justify?: string;
  width?: string;
  isButtonGroup?: boolean;
};
