import { ID_FIELD } from '../consts/commonFields';
import { ICompanyType } from '../consts/companyTypes';
import { VendorFields } from '../consts/vendors';

export const MOCK_VENDORS_DATA = [
  {
    [ID_FIELD]: '1',
    [VendorFields.Title]: 'אמניב',
    [VendorFields.CommercialName]: 'אמניב',
    [VendorFields.CompanyNumber]: '561506876',
    [VendorFields.CompanExternalNumber]: '54654',
    [VendorFields.CompanyType]: ICompanyType.PrivateCompany,
    [VendorFields.Phone]: '053-1234568',
    [VendorFields.Email]: 'foo@gmail.com',
    [VendorFields.TaxesEndDate]: '2020-01-06',
    [VendorFields.TaxPercent]: '5%',
    [VendorFields.Address]: 'הנביאים 8 אשדוד',
    [VendorFields.Description]: '',
    [VendorFields.Status]: 'פעיל',
  },
  {
    [ID_FIELD]: '2',
    [VendorFields.Title]: 'דוחובוני',
    [VendorFields.CompanyNumber]: '561506876',
    [VendorFields.CompanExternalNumber]: '8964565',
    [VendorFields.CompanyType]: ICompanyType.PrivateCompany,
    [VendorFields.Phone]: '053-68746546',
    [VendorFields.Email]: 'asdf@gmail.com',
    [VendorFields.TaxesEndDate]: '2023-01-06',
    [VendorFields.TaxPercent]: '3.5%',
    [VendorFields.Address]: 'הנביאים 8 חיפה',
    [VendorFields.Description]: '',
    [VendorFields.Status]: 'פעיל',
  },
  {
    [ID_FIELD]: '3',
    [VendorFields.Title]: 'א.א. אביבי מטבחים (2004) בעמ',
    [VendorFields.CompanyNumber]: '561506876',
    [VendorFields.CompanExternalNumber]: '986546',
    [VendorFields.CompanyType]: ICompanyType.PrivateCompany,
    [VendorFields.Phone]: '053-6455458',
    [VendorFields.Email]: 'sddd@gmail.com',
    [VendorFields.TaxesEndDate]: '2020-01-09',
    [VendorFields.TaxPercent]: '2.5%',
    [VendorFields.Address]: 'הנביאים 8 קרית מוצקין',
    [VendorFields.Description]: '',
    [VendorFields.Status]: 'פעיל',
  },
];
