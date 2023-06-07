import {
  IRoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ContractsPage() {
  const { replace, query } = useRouter();
  const projectId = queryParamToString(query, PROJECT_ID_QUERY);
  const projectType = queryParamToString(query, PROJECT_TYPE_QUERY);
  useEffect(() => {
    if (projectId && projectType) {
      replace({
        pathname: IRoutesNames.Project,
        query: { projectId, projectType },
      });
    } else {
      replace(IRoutesNames.App);
    }
  }, [replace, projectId, projectType]);
  return null;
}
