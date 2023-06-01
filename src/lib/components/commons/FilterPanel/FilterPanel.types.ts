export enum IFilterItemType {
  Date = 'date',
  Buttons = 'buttons',
}

export type IFilterItem<T extends string = string> = {
  type: IFilterItemType;
  field: T;
};

export type IFilterPanelProps = {
  filters: IFilterItem[];
};
export type IFilterPanelButtonProps = {};

export type IStatusState = 'active' | 'not-active' | 'cancel';

export type IStyledFilterProps = {
  justify?: string;
  width?: string;
  isButtonGroup?: boolean;
};
