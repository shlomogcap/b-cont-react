import { Lang } from '@/lib/consts/displayTexts';
import { VendorFields } from './VendorFields';

type DisplayTextMapping = {
  fields: Record<VendorFields, string>;
};

export const VENDOR_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [VendorFields.Title]: 'חברה',
      [VendorFields.CommercialName]: 'שם מסחרי',
      [VendorFields.CompanyNumber]: 'ח.פ.',
      [VendorFields.CompanExternalNumber]: 'קוד בסאפ',
      [VendorFields.CompanyType]: 'סוג עוסק',
      [VendorFields.Phone]: 'טלפון',
      [VendorFields.Email]: 'אימייל',
      [VendorFields.TaxesEndDate]: 'תוקף ניכוי מס במקור',
      [VendorFields.TaxPercent]: '% ניכוי מס',
      [VendorFields.Address]: 'כתובת',
      [VendorFields.Description]: 'הערות',
      [VendorFields.Status]: 'סטטוס',
    },
  },
  en: {
    fields: {
      [VendorFields.Title]: 'Title',
      [VendorFields.CommercialName]: 'Commercial Name',
      [VendorFields.CompanyNumber]: 'Company Number',
      [VendorFields.CompanExternalNumber]: 'Company Ex. Number',
      [VendorFields.CompanyType]: 'Company Type',
      [VendorFields.Phone]: 'Phone',
      [VendorFields.Email]: 'Email',
      [VendorFields.TaxesEndDate]: 'Taxes End Date',
      [VendorFields.TaxPercent]: 'Tax Percent',
      [VendorFields.Address]: 'Address',
      [VendorFields.Description]: 'Description',
      [VendorFields.Status]: 'Status',
    },
  },
};
