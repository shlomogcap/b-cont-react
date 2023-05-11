import { Routes } from '@/lib/consts/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SectionsPage() {
  const { replace, query } = useRouter();
  useEffect(() => {
    const { projectId = '', contractId = '' } = query;
    if (projectId && contractId) {
      replace({
        pathname: Routes.Contract,
        query: { projectId, contractId },
      });
    }
  }, [replace, query]);
  return null;
}
