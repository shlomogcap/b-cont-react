import { useRouter } from 'next/router';
import { Table, fieldsNamesToColumns } from '../commons/Table';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import { VENDOR_DISPLAY_TEXTS, EVendorFields } from '@/lib/consts/vendors';
import { ERoutesNames, VENDOR_ID_QUERY } from '@/lib/consts/routes';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';

export const VendorsTable = () => {
  const router = useRouter();
  const { data: rows, isLoading } = useVendorsContext();
  return (
    <Table
      loading={isLoading}
      columns={fieldsNamesToColumns(
        [
          EVendorFields.Title,
          EVendorFields.CompanyNumber,
          EVendorFields.CommercialName,
          EVendorFields.CompanExternalNumber,
          { field: EVendorFields.TaxesEndDate, type: 'date' },
          EVendorFields.TaxPercent,
          EVendorFields.Phone,
          EVendorFields.Email,
          EVendorFields.Status,
        ],
        VENDOR_DISPLAY_TEXTS.he.fields,
      )}
      rows={rows}
      totals={{
        [EVendorFields.Title]:
          rows.length < 2
            ? '-'
            : `${rows.length.toLocaleString()} ${
                DISPLAY_TEXTS.he.routeNames[ERoutesNames.Vendors]
              }`,
      }}
      onRowClick={({ id }) =>
        router.push({
          pathname: ERoutesNames.Vendor,
          query: { [VENDOR_ID_QUERY]: id },
        })
      }
    />
  );
};
