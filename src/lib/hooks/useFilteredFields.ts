import { useEffect } from 'react';
import {
  IActiveFilters,
  IWatchFields,
} from '../components/commons/FilterPanel';

const getEntries = <T extends {}>(obj: T) =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

export const useFilteredFields = <F extends string = string>(
  watchedFields: IWatchFields<F>,
  setActiveFilters: (filters: IActiveFilters<F>) => void,
) => {
  useEffect(() => {
    const activeFilterFields: IActiveFilters<F> = {} as IActiveFilters<F>;
    getEntries(watchedFields).forEach(([field, { value }]) => {
      if (
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'object' && Object.values(value).some(Boolean))
      ) {
        activeFilterFields[field] = true;
      }
    });
    setActiveFilters({ ...activeFilterFields });
  }, [watchedFields, setActiveFilters]);
};
