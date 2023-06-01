import { useRouter } from 'next/router';
import { Table, fieldsNamesToColumns } from '../commons/Table';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import { VENDOR_DISPLAY_TEXTS, IVendorFields } from '@/lib/consts/vendors';
import { IRoutesNames, VENDOR_ID_QUERY } from '@/lib/consts/routes';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';

export const VendorsTable = () => {
  const router = useRouter();
  const { data: rows, isLoading } = useVendorsContext();
  return (
    <Table
      loading={isLoading}
      columns={fieldsNamesToColumns(
        [
          IVendorFields.Title,
          IVendorFields.CompanyNumber,
          IVendorFields.CommercialName,
          IVendorFields.CompanExternalNumber,
          { field: IVendorFields.TaxesEndDate, type: 'date' },
          IVendorFields.TaxPercent,
          IVendorFields.Phone,
          IVendorFields.Email,
          IVendorFields.Status,
        ],
        VENDOR_DISPLAY_TEXTS.he.fields,
      )}
      rows={rows}
      totals={{
        [IVendorFields.Title]:
          rows.length < 2
            ? '-'
            : `${rows.length.toLocaleString()} ${
                DISPLAY_TEXTS.he.routeNames[IRoutesNames.Vendors]
              }`,
      }}
      onRowClick={({ id }) =>
        router.push({
          pathname: IRoutesNames.Vendor,
          query: { [VENDOR_ID_QUERY]: id },
        })
      }
    />
  );
};
