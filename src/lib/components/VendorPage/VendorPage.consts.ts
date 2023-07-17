import { EVendorFields, VENDOR_DISPLAY_TEXTS } from '@/lib/consts/vendors';
import { z } from 'zod';
import { EFilterItemType, IFilterItem } from '../commons/FilterPanel';
import { dateFilterSchema } from '../commons/FilterPanel/FilterPanel.consts';
import { EVendorStatus } from '@/lib/consts/vendors/VendorStatus';
import { ITableColumnOption } from '../commons/Table';

export const VENDOR_STATUS_OPTIONS: ITableColumnOption[] = [
  EVendorStatus.Active,
  EVendorStatus.NonActive,
].map((vendorStatus) => ({
  text: VENDOR_DISPLAY_TEXTS.he.vendorStatus[vendorStatus],
  value: vendorStatus,
}));

export const VENDOR_VIEW_TABS = [
  {
    id: '',
    text: VENDOR_DISPLAY_TEXTS.he.fields[EVendorFields.CompanyType],
  },
];

export const vendorFilterSchema = z.object({
  [EVendorFields.Status]: z.object({
    type: z.literal(EFilterItemType.Buttons),
    value: z.array(z.nativeEnum(EVendorStatus)),
  }),
  [EVendorFields.TaxesEndDate]: z.object({
    type: z.literal(EFilterItemType.Date),
    value: dateFilterSchema,
  }),
});

export const vendorsTableFilters: IFilterItem<EVendorFields>[] = [
  {
    type: EFilterItemType.Buttons,
    field: EVendorFields.Status,
    options: Object.values(EVendorStatus).map((value) => ({
      value,
      text: VENDOR_DISPLAY_TEXTS.he.vendorStatus[value],
      isMultiOptional: true,
    })),
    defaultValue: [EVendorStatus.Active],
  },
  {
    type: EFilterItemType.Date,
    field: EVendorFields.TaxesEndDate,
  },
];
