import { PageLayout } from '../PageLayout';
import { Table, fieldsNamesToColumns } from '../commons/Table';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { IVendorsPageProps } from './VendorsPage.types';
import { useRouter } from 'next/router';
import { VENDORS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { VendorsTable } from '../VendorPage/VendorsTable';
import { Routes } from '@/lib/consts/routes';

export const VendorsPage = (_props: IVendorsPageProps) => {
  const router = useRouter();

  const title = DISPLAY_TEXTS.he.routeNames[Routes.Vendors];

  return (
    <PageLayout title={title} breadcrubms={[VENDORS_BREADCRUMB]}>
      <VendorsTable />
    </PageLayout>
  );
};
