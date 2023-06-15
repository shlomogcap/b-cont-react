export enum IFilterItemType {
  Date = 'date',
  Buttons = 'buttons',
}

export type IFilterItemOption = {
  text: string;
  value: string;
};

export type IFilterItem<T extends string = string> =
  | {
      type: IFilterItemType.Date;
      field: T;
      defatulValue?: {
        from: string;
        to: string;
      };
      options?: undefined;
    }
  | {
      type: IFilterItemType.Buttons;
      field: T;
      options: IFilterItemOption[];
      defatulValue?: string[];
    };

const buttonsFilter: IFilterItem = {
  field: 'blah',
  type: IFilterItemType.Buttons,
  options: [],
};
const dateFilter: IFilterItem = {
  field: 'blah',
  type: IFilterItemType.Date,
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

export type IStyledFilterProps = {
  isFiltered?: boolean;
  justify?: string;
  width?: string;
  isButtonGroup?: boolean;
};
