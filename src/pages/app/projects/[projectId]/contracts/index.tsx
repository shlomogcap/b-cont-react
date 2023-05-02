import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ContractsPage() {
  const { replace, query } = useRouter();
  const projectId = String(query.projectId ?? '');
  useEffect(() => {
    if (projectId) {
      replace({
        pathname: '/app/projects/[projectId]',
        query: { projectId },
      });
    }
  }, [replace, projectId]);
  return null;
}
