export enum EFilterItemType {
  Date = 'date',
  Buttons = 'buttons',
}

export type TFilterItemOption<V extends string = string> = {
  text: string;
  value: V;
};

export type TDateFilterValue = {
  from?: Date | string;
  to?: Date | string;
};

export type TFilterItem<T extends string = string, V extends string = string> =
  | {
      type: IFilterItemType.Date;
      field: T;
      defaultValue?: IDateFilterValue;
      options?: undefined;
    }
  | {
      type: IFilterItemType.Buttons;
      field: T;
      options: IFilterItemOption<V>[];
      defaultValue?: V[];
    };

export type TFilterValues =
  | {
      type: IFilterItemType.Date;
      value: IDateFilterValue;
    }
  | {
      type: IFilterItemType.Buttons;
      value: string[];
    };

export type TFilterButtonsControlProps = {
  label: string;
  field: string;
  options: IFilterItemOption[];
};

export type TFilterDatesControlProps = {
  label: string;
  field: string;
};

export type TFilterPanelProps<T extends string = string> = {
  filters: IFilterItem<T>[];
  displayTexts: Record<T, string>;
  status: any;
  activeFilters: any;
};
export type TFilterPanelButtonProps<
  T extends string = string,
  V extends string = string,
> = {
  field: T;
  currentValue: V;
};

export type TStyledFilterProps = {
  isFiltered?: boolean;
  justify?: string;
  width?: string;
  isButtonGroup?: boolean;
};
