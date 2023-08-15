import { useEffect } from 'react';
import {
  IActiveFilters,
  IWatchedFields,
} from '../components/commons/FilterPanel';
import { getEntries } from '../utils/arrayUtils';

export const useFilteredFields = <F extends string = string>(
  watchedFields: IWatchedFields<F>,
  setActiveFilters: (filters: (filters: IActiveFilters<F>) => void) => void,
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
    setActiveFilters((filters) => ({
      ...filters,
      ...activeFilterFields,
    }));
  }, [watchedFields, setActiveFilters]);
};
