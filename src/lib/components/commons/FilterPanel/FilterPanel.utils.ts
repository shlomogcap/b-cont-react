import {
  isBetween,
  isSameOrAfter,
  isSameOrBefore,
} from '@/lib/utils/dateUtils';
import {
  IFilterItem,
  EFilterItemType,
  IFilterValues,
} from './FilterPanel.types';

const getFilterItemDefaultData = (item: IFilterItem) => {
  switch (item.type) {
    case EFilterItemType.Buttons:
      return item.defaultValue ?? [];
    case EFilterItemType.Date:
      return {
        from: item.defaultValue?.from ?? '',
        to: item.defaultValue?.to ?? '',
      };
  }
};

export const getDefaultFilterValues = (filters: IFilterItem[]) => {
  return filters.reduce(
    (result, filterItem) => ({
      ...result,
      [filterItem.field]: {
        type: filterItem.type,
        value: getFilterItemDefaultData(filterItem),
      },
    }),
    {},
  );
};

export const filterByFilterPanel = <Doc extends {}>(
  row: Doc,
  filterFields: Record<string, IFilterValues>,
) => {
  return Object.entries<IFilterValues>(filterFields).every(
    ([field, { type, value }]) => {
      switch (type) {
        case EFilterItemType.Date:
          const fromValue = Array.isArray(value) ? '' : value?.from;
          const toValue = Array.isArray(value) ? '' : value?.to;
          const fieldValue = String(row[field as keyof Doc] ?? '');

          if ((!fromValue && !toValue) || !fieldValue) {
            return true;
          }
          if (fromValue && toValue) {
            return isBetween(fieldValue, fromValue, toValue);
          }
          if (fromValue) {
            return isSameOrAfter(fieldValue, fromValue);
          }
          if (toValue) {
            return isSameOrBefore(fieldValue, toValue);
          }
        case EFilterItemType.Buttons:
          const array = value as string[];
          if (!array.length) return true;
          return array.includes(String(row[field as keyof Doc]));
        default:
          break;
      }
      return true;
    },
  );
};

export const filterBySearch = <T extends {}, F extends keyof T>(
  r: T,
  tableSearchFields: F[],
  searchValue: string,
  getValue?: (ref: string) => (string | undefined)[] | undefined,
) => {
  return searchValue.trim().length >= 2
    ? tableSearchFields.some((field) =>
        String(getValue?.(r[field]) ?? r[field])?.includes(searchValue),
      )
    : true;
};
