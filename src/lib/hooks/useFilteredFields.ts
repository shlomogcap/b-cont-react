import { useEffect } from 'react';
import { EProjectFields } from '../consts/projects';

export const useFilteredFields = (
  watchedFields: any,
  setActiveFilters: any,
) => {
  useEffect(() => {
    const activeFilterFields: Partial<Record<EProjectFields, boolean>> = {};
    Object.entries(watchedFields).forEach(([field, { value }]: any) => {
      if (
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'object' && Object.values(value).some(Boolean))
      ) {
        activeFilterFields[field as EProjectFields] = true;
      }
    });
    setActiveFilters({ ...activeFilterFields });
  }, [watchedFields]);
};
