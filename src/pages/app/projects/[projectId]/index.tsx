import { ProjectPage } from '@/lib/components/ProjectPage/ProjectPage';
import { PROJECT_ID_QUERY } from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProjectRoute() {
  const { query } = useRouter();
  return (
    <ProjectPage projectId={queryParamToString(query, PROJECT_ID_QUERY)} />
  );
}
