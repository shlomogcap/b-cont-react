export enum IFilterItemType {
  Date = 'date',
  Buttons = 'buttons',
}

export type IFilterItemOption = {
  text: string;
  value: string | boolean | number;
};

export type IFilterItem<T extends string = string> =
  | {
      type: IFilterItemType.Date;
      field: T;
    }
  | {
      type: IFilterItemType.Buttons;
      field: T;
      options: IFilterItemOption[];
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
