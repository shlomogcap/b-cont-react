import Z from 'zod';
import { WithIdField } from '@/lib/utils/WithIdField';
import { VendorFields } from './VendorFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { ICompanyType } from '../companyTypes';
import { IVendorStatus } from './VendorStatus';

export const VendorDoc = Z.object({
  [VendorFields.Title]: TITLE_FIELD_SCHEMA,
  [VendorFields.CommercialName]: OPTIONAL_STRING_SCHEMA,
  [VendorFields.CompanyNumber]: OPTIONAL_STRING_SCHEMA,
  [VendorFields.CompanExternalNumber]: OPTIONAL_STRING_SCHEMA,
  [VendorFields.CompanyType]: Z.nativeEnum(ICompanyType).optional(),
  [VendorFields.Phone]: OPTIONAL_STRING_SCHEMA,
  [VendorFields.Email]: OPTIONAL_STRING_SCHEMA,
  [VendorFields.TaxesEndDate]: OPTIONAL_DATE_SCHEMA,
  [VendorFields.TaxPercent]: OPTIONAL_NUMBER_SCHEMA,
  [VendorFields.Address]: OPTIONAL_STRING_SCHEMA,
  [VendorFields.Description]: OPTIONAL_STRING_SCHEMA,
  [VendorFields.Status]: Z.nativeEnum(IVendorStatus).optional(),
});

export type IVendorDoc = WithIdField<Z.infer<typeof VendorDoc>>;
