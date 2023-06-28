export enum EFilterItemType {
  Date = 'date',
  Buttons = 'buttons',
}

export type IFilterItemOption<V extends string = string> = {
  text: string;
  value: V;
};

export type IDateFilterValue = {
  from?: Date | string;
  to?: Date | string;
};

export type IFilterItem<T extends string = string, V extends string = string> =
  | {
      type: EFilterItemType.Date;
      field: T;
      defaultValue?: IDateFilterValue;
      options?: undefined;
    }
  | {
      type: EFilterItemType.Buttons;
      field: T;
      options: IFilterItemOption<V>[];
      defaultValue?: V[];
    };

export type IFilterValues =
  | {
      type: EFilterItemType.Date;
      value: IDateFilterValue;
    }
  | {
      type: EFilterItemType.Buttons;
      value: string[];
    };

export type IFilterButtonsControlProps = {
  label: string;
  field: string;
  options: IFilterItemOption[];
};

export type IFilterDatesControlProps = {
  label: string;
  field: string;
};

export type IFilterPanelProps<T extends string = string> = {
  filters: IFilterItem<T>[];
  displayTexts: Record<T, string>;
  status: any;
  activeFilters: any;
  searchProps?: any;
};
export type IFilterPanelButtonProps<
  T extends string = string,
  V extends string = string,
> = {
  field: T;
  currentValue: V;
};

export type IStyledFilterProps = {
  isFiltered?: boolean;
  justify?: string;
  width?: string;
  isButtonGroup?: boolean;
};
