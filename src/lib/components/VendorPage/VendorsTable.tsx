import { useRouter } from 'next/router';
import { Table, fieldsNamesToColumns } from '../commons/Table';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import { VENDOR_DISPLAY_TEXTS, VendorFields } from '@/lib/consts/vendors';
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
          VendorFields.Title,
          VendorFields.CompanyNumber,
          VendorFields.CommercialName,
          VendorFields.CompanExternalNumber,
          { field: VendorFields.TaxesEndDate, type: 'date' },
          VendorFields.TaxPercent,
          VendorFields.Phone,
          VendorFields.Email,
          VendorFields.Status,
        ],
        VENDOR_DISPLAY_TEXTS.he.fields,
      )}
      rows={rows}
      totals={{
        [VendorFields.Title]:
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