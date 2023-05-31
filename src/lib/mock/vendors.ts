import { ID_FIELD } from '../consts/commonFields';
import { ICompanyType } from '../consts/companyTypes';
import { IVendorFields } from '../consts/vendors';

export const MOCK_VENDORS_DATA = [
  {
    [ID_FIELD]: '1',
    [IVendorFields.Title]: 'אמניב',
    [IVendorFields.CommercialName]: 'אמניב',
    [IVendorFields.CompanyNumber]: '561506876',
    [IVendorFields.CompanExternalNumber]: '54654',
    [IVendorFields.CompanyType]: ICompanyType.PrivateCompany,
    [IVendorFields.Phone]: '053-1234568',
    [IVendorFields.Email]: 'foo@gmail.com',
    [IVendorFields.TaxesEndDate]: '2020-01-06',
    [IVendorFields.TaxPercent]: '5%',
    [IVendorFields.Address]: 'הנביאים 8 אשדוד',
    [IVendorFields.Description]: '',
    [IVendorFields.Status]: 'פעיל',
  },
  {
    [ID_FIELD]: '2',
    [IVendorFields.Title]: 'דוחובוני',
    [IVendorFields.CompanyNumber]: '561506876',
    [IVendorFields.CompanExternalNumber]: '8964565',
    [IVendorFields.CompanyType]: ICompanyType.PrivateCompany,
    [IVendorFields.Phone]: '053-68746546',
    [IVendorFields.Email]: 'asdf@gmail.com',
    [IVendorFields.TaxesEndDate]: '2023-01-06',
    [IVendorFields.TaxPercent]: '3.5%',
    [IVendorFields.Address]: 'הנביאים 8 חיפה',
    [IVendorFields.Description]: '',
    [IVendorFields.Status]: 'פעיל',
  },
  {
    [ID_FIELD]: '3',
    [IVendorFields.Title]: 'א.א. אביבי מטבחים (2004) בעמ',
    [IVendorFields.CompanyNumber]: '561506876',
    [IVendorFields.CompanExternalNumber]: '986546',
    [IVendorFields.CompanyType]: ICompanyType.PrivateCompany,
    [IVendorFields.Phone]: '053-6455458',
    [IVendorFields.Email]: 'sddd@gmail.com',
    [IVendorFields.TaxesEndDate]: '2020-01-09',
    [IVendorFields.TaxPercent]: '2.5%',
    [IVendorFields.Address]: 'הנביאים 8 קרית מוצקין',
    [IVendorFields.Description]: '',
    [IVendorFields.Status]: 'פעיל',
  },
];
