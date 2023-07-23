import { z } from 'zod';
import { vendorFilterSchema } from './VendorPage.consts';

export type IVendorPageProps = {
  vendorId: string;
};

export type IVendorFilterDoc = z.infer<typeof vendorFilterSchema>;
