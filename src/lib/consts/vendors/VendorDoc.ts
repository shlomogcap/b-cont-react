import Z from 'zod';
import { WithCommonFields } from '@/lib/utils/WithFields';
import { IVendorFields } from './VendorFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { ICompanyType } from '../companyTypes';
import { IVendorStatus } from './VendorStatus';

export const VendorDoc = Z.object({
  [IVendorFields.Title]: TITLE_FIELD_SCHEMA,
  [IVendorFields.CommercialName]: OPTIONAL_STRING_SCHEMA,
  [IVendorFields.CompanyNumber]: OPTIONAL_STRING_SCHEMA,
  [IVendorFields.CompanExternalNumber]: OPTIONAL_STRING_SCHEMA,
  [IVendorFields.CompanyType]: Z.nativeEnum(ICompanyType).optional(),
  [IVendorFields.Phone]: OPTIONAL_STRING_SCHEMA,
  [IVendorFields.Email]: OPTIONAL_STRING_SCHEMA,
  [IVendorFields.TaxesEndDate]: OPTIONAL_DATE_SCHEMA,
  [IVendorFields.TaxPercent]: OPTIONAL_NUMBER_SCHEMA,
  [IVendorFields.Address]: OPTIONAL_STRING_SCHEMA,
  [IVendorFields.Description]: OPTIONAL_STRING_SCHEMA,
  [IVendorFields.Status]: Z.nativeEnum(IVendorStatus).optional(),
});

export type TVendorDoc = WithCommonFields<Z.infer<typeof VendorDoc>>;
