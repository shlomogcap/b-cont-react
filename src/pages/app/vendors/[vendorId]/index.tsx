import { VendorPage } from '@/lib/components/VendorPage/VendorPage';
import { VENDOR_ID_QUERY } from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import React from 'react';

export default function VendorRoute() {
  const { query } = useRouter();
  return <VendorPage vendorId={queryParamToString(query, VENDOR_ID_QUERY)} />;
}
