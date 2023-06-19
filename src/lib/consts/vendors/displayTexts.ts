import { Lang } from '@/lib/consts/displayTexts';
import { IVendorFields } from './VendorFields';

type IDisplayTextMapping = {
  fields: Record<IVendorFields, string>;
};

export const VENDOR_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [IVendorFields.Title]: 'חברה',
      [IVendorFields.CommercialName]: 'שם מסחרי',
      [IVendorFields.CompanyNumber]: 'ח.פ.',
      [IVendorFields.CompanExternalNumber]: 'קוד בסאפ',
      [IVendorFields.CompanyType]: 'סוג עוסק',
      [IVendorFields.Phone]: 'טלפון',
      [IVendorFields.Email]: 'אימייל',
      [IVendorFields.TaxesEndDate]: 'תוקף ניכוי מס במקור',
      [IVendorFields.TaxPercent]: '% ניכוי מס',
      [IVendorFields.Address]: 'כתובת',
      [IVendorFields.Description]: 'הערות',
      [IVendorFields.Status]: 'סטטוס',
    },
  },
  en: {
    fields: {
      [IVendorFields.Title]: 'Title',
      [IVendorFields.CommercialName]: 'Commercial Name',
      [IVendorFields.CompanyNumber]: 'Company Number',
      [IVendorFields.CompanExternalNumber]: 'Company Ex. Number',
      [IVendorFields.CompanyType]: 'Company Type',
      [IVendorFields.Phone]: 'Phone',
      [IVendorFields.Email]: 'Email',
      [IVendorFields.TaxesEndDate]: 'Taxes End Date',
      [IVendorFields.TaxPercent]: 'Tax Percent',
      [IVendorFields.Address]: 'Address',
      [IVendorFields.Description]: 'Description',
      [IVendorFields.Status]: 'Status',
    },
  },
};
