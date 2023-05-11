import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';
import {
  PROJECTS_BREADCRUMB,
  VENDORS_BREADCRUMB,
} from '@/lib/consts/breadcrumbs';
import { useState } from 'react';
import { ProjectMainViews } from '@/lib/consts/projects';
import { IVendorPageProps } from './VendorPage.types';
import { MOCK_VENDORS_DATA } from '@/lib/mock/vendors';

export const VendorPage = ({ vendorId }: IVendorPageProps) => {
  const [activeTab, setActiveTab] = useState(ProjectMainViews.Overview);
  const title = DISPLAY_TEXTS.he.routeNames[Routes.Projects];
  const vendorName =
    MOCK_VENDORS_DATA.find((p) => p.id === vendorId)?.title ?? '';
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        VENDORS_BREADCRUMB,
        {
          text: vendorName || vendorId,
          id: Routes.Vendor,
        },
      ]}
    ></PageLayout>
  );
};
