import {
  isBetween,
  isSameOrAfter,
  isSameOrBefore,
} from '@/lib/utils/dateUtils';
import {
  IFilterItem,
  IFilterItemType,
  IFilterValues,
} from './FilterPanel.types';

const getFilterItemDefaultData = (item: IFilterItem) => {
  switch (item.type) {
    case IFilterItemType.Buttons:
      return item.defaultValue ?? [];
    case IFilterItemType.Date:
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
        case IFilterItemType.Date:
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
        case IFilterItemType.Buttons:
          const array = value as string[];
          return array.includes(String(row[field as keyof Doc]));
        default:
          break;
      }
      return true;
    },
  );
};
