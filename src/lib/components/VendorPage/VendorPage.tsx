import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { IRoutesNames } from '../../consts/routes';
import { VENDORS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { IVendorPageProps } from './VendorPage.types';
import { useVendorsContext } from '@/lib/context/vendorsContext';

export const VendorPage = ({ vendorId }: IVendorPageProps) => {
  const title = DISPLAY_TEXTS.he.routeNames[IRoutesNames.Vendor];
  const { data } = useVendorsContext();
  const vendor = data.find((p) => p.id === vendorId);
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        VENDORS_BREADCRUMB,
        {
          text: vendor?.title || vendorId,
          id: IRoutesNames.Vendor,
        },
      ]}
    ></PageLayout>
  );
};
