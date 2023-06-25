import Z from 'zod';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EVendorFields } from './VendorFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { ECompanyType } from '../companyTypes';
import { EVendorStatus } from './VendorStatus';

export const VendorDoc = Z.object({
  [EVendorFields.Title]: TITLE_FIELD_SCHEMA,
  [EVendorFields.CommercialName]: OPTIONAL_STRING_SCHEMA,
  [EVendorFields.CompanyNumber]: OPTIONAL_STRING_SCHEMA,
  [EVendorFields.CompanExternalNumber]: OPTIONAL_STRING_SCHEMA,
  [EVendorFields.CompanyType]: Z.nativeEnum(ECompanyType).optional(),
  [EVendorFields.Phone]: OPTIONAL_STRING_SCHEMA,
  [EVendorFields.Email]: OPTIONAL_STRING_SCHEMA,
  [EVendorFields.TaxesEndDate]: OPTIONAL_DATE_SCHEMA,
  [EVendorFields.TaxPercent]: OPTIONAL_NUMBER_SCHEMA,
  [EVendorFields.Address]: OPTIONAL_STRING_SCHEMA,
  [EVendorFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EVendorFields.Status]: Z.nativeEnum(EVendorStatus).optional(),
});

export type IVendorDoc = IWithCommonFields<Z.infer<typeof VendorDoc>>;
