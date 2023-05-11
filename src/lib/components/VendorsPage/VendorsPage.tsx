import { PageLayout } from '../PageLayout';
import { Table, fieldsNamesToColumns } from '../commons/Table';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes, VENDOR_ID_QUERY } from '../../consts/routes';
import { IVendorsPageProps } from './VendorsPage.types';
import { useRouter } from 'next/router';
import { MOCK_VENDORS_DATA } from '@/lib/mock/vendors';
import { VENDOR_DISPLAY_TEXTS, VendorFields } from '@/lib/consts/vendors';
import { VENDORS_BREADCRUMB } from '@/lib/consts/breadcrumbs';

export const VendorsPage = (_props: IVendorsPageProps) => {
  const router = useRouter();

  const title = DISPLAY_TEXTS.he.routeNames[Routes.Vendors];

  return (
    <PageLayout title={title} breadcrubms={[VENDORS_BREADCRUMB]}>
      <Table
        columns={fieldsNamesToColumns(
          [
            VendorFields.Title,
            VendorFields.CompanyNumber,
            VendorFields.CommercialName,
            VendorFields.CompanExternalNumber,
            VendorFields.TaxesEndDate,
            VendorFields.TaxPercent,
            VendorFields.Phone,
            VendorFields.Email,
            VendorFields.Status,
          ],
          VENDOR_DISPLAY_TEXTS.he.fields,
        )}
        rows={MOCK_VENDORS_DATA as any}
        onRowClick={({ id }) =>
          router.push({
            pathname: Routes.Vendor,
            query: { [VENDOR_ID_QUERY]: id },
          })
        }
      />
    </PageLayout>
  );
};
