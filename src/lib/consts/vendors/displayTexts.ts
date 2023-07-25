import { ILang } from '@/lib/consts/displayTexts';
import { EVendorFields } from './VendorFields';
import { EVendorStatus } from './VendorStatus';

type IDisplayTextMapping = {
  fields: Record<EVendorFields, string>;
  vendorStatus: Record<EVendorStatus, string>;
  addNewVendor: string;
};

export const VENDOR_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    fields: {
      [EVendorFields.Title]: 'חברה',
      [EVendorFields.CommercialName]: 'שם מסחרי',
      [EVendorFields.CompanyNumber]: 'ח.פ.',
      [EVendorFields.CompanExternalNumber]: 'קוד בסאפ',
      [EVendorFields.CompanyType]: 'סוג עוסק',
      [EVendorFields.Phone]: 'טלפון',
      [EVendorFields.Email]: 'אימייל',
      [EVendorFields.TaxesEndDate]: 'תוקף ניכוי מס במקור',
      [EVendorFields.TaxPercent]: '% ניכוי מס',
      [EVendorFields.Address]: 'כתובת',
      [EVendorFields.Description]: 'הערות',
      [EVendorFields.Status]: 'סטטוס',
    },
    vendorStatus: {
      [EVendorStatus.Active]: 'פעיל',
      [EVendorStatus.NonActive]: 'לא פעיל',
    },
    addNewVendor: 'הוסף קבלן',
  },
  en: {
    fields: {
      [EVendorFields.Title]: 'Title',
      [EVendorFields.CommercialName]: 'Commercial Name',
      [EVendorFields.CompanyNumber]: 'Company Number',
      [EVendorFields.CompanExternalNumber]: 'Company Ex. Number',
      [EVendorFields.CompanyType]: 'Company Type',
      [EVendorFields.Phone]: 'Phone',
      [EVendorFields.Email]: 'Email',
      [EVendorFields.TaxesEndDate]: 'Taxes End Date',
      [EVendorFields.TaxPercent]: 'Tax Percent',
      [EVendorFields.Address]: 'Address',
      [EVendorFields.Description]: 'Description',
      [EVendorFields.Status]: 'Status',
    },
    vendorStatus: {
      [EVendorStatus.Active]: 'Active',
      [EVendorStatus.NonActive]: 'Not Active',
    },
    addNewVendor: 'Add new vendor',
  },
};
