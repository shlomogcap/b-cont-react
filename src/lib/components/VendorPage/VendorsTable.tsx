import { useRouter } from 'next/router';
import { Table, fieldsNamesToColumns } from '../commons/Table';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import {
  VENDOR_DISPLAY_TEXTS,
  EVendorFields,
  IVendorDoc,
} from '@/lib/consts/vendors';
import { ERoutesNames, VENDOR_ID_QUERY } from '@/lib/consts/routes';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VENDOR_STATUS_OPTIONS,
  vendorFilterSchema,
  vendorsTableFilters,
} from './VendorPage.consts';
import {
  filterByFilterPanel,
  filterBySearch,
  getDefaultFilterValues,
} from '../commons/FilterPanel';
import { useFilteredFields } from '@/lib/hooks/useFilteredFields';
import { useState } from 'react';
import {
  SearchableContextProvider,
  useSearchableContext,
} from '../commons/SearchBar/searchableContext';
import { EVendorStatus } from '@/lib/consts/vendors/VendorStatus';
import { EToolbarButtons } from '../commons/ToolBar/ToolBar.consts';

export const VendorsTable = () => {
  const form = useForm<IVendorDoc>({
    resolver: zodResolver(vendorFilterSchema),
    defaultValues: getDefaultFilterValues(vendorsTableFilters),
    mode: 'onSubmit',
  });

  return (
    <FormProvider {...form}>
      <SearchableContextProvider>
        <VendorsTableInner />
      </SearchableContextProvider>
    </FormProvider>
  );
};

const VendorsTableInner = () => {
  const router = useRouter();
  const { data: rows, isLoading } = useVendorsContext();
  const vendorsTableColumns = fieldsNamesToColumns(
    [
      EVendorFields.Title,
      EVendorFields.CompanyNumber,
      EVendorFields.CommercialName,
      EVendorFields.CompanExternalNumber,
      { field: EVendorFields.TaxesEndDate, type: 'date' },
      EVendorFields.TaxPercent,
      EVendorFields.Phone,
      EVendorFields.Email,
      {
        field: EVendorFields.Status,
        display: VENDOR_DISPLAY_TEXTS.he.fields[EVendorFields.Status],
        type: 'list',
        options: VENDOR_STATUS_OPTIONS,
      },
    ],
    VENDOR_DISPLAY_TEXTS.he.fields,
  );

  const [activeFilters, setActiveFilters] = useState(
    Object.values(vendorsTableColumns).reduce(
      (acc, curr) => ({ ...acc, [curr.fieldPath ?? curr.field]: false }),
      {},
    ),
  );
  const watchedFields = useWatch();
  useFilteredFields(watchedFields, setActiveFilters);
  const { searchValue } = useSearchableContext();
  const searchFields = [
    EVendorFields.Title,
    EVendorFields.CompanyNumber,
    EVendorFields.CommercialName,
    EVendorFields.CompanExternalNumber,
  ];
  return (
    <Table
      loading={isLoading}
      columns={vendorsTableColumns}
      rows={rows
        .filter((r) => filterByFilterPanel(r, watchedFields as any))
        .filter((r) => filterBySearch(r, searchFields, searchValue))}
      totals={{
        [EVendorFields.Title]:
          rows.length < 2
            ? '-'
            : `${rows.length.toLocaleString()} ${
                DISPLAY_TEXTS.he.routeNames[ERoutesNames.Vendors]
              }`,
      }}
      onRowClick={({ id }) =>
        router.push({
          pathname: ERoutesNames.Vendor,
          query: { [VENDOR_ID_QUERY]: id },
        })
      }
      tableFilterProps={{
        filters: vendorsTableFilters,
        displayTexts: VENDOR_DISPLAY_TEXTS.he.fields,
        status: EVendorStatus,
        activeFilters,
      }}
      addItem={{
        text: VENDOR_DISPLAY_TEXTS.he.addNewVendor,
        handleAddItem: () => {
          router.push({
            pathname: ERoutesNames.NewVendor,
          });
        },
      }}
      toolbar={{
        buttons: [EToolbarButtons.Duplicate, EToolbarButtons.Delete],
        getDisplay: DISPLAY_TEXTS.he.toolbar,
        type: DISPLAY_TEXTS.he.routeNames[ERoutesNames.Project],
      }}
    />
  );
};
