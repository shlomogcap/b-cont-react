import { ProjectPage } from '@/lib/components/ProjectPage/ProjectPage';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProjectRoute() {
  const { query } = useRouter();
  return <ProjectPage projectId={queryParamToString(query, 'projectId')} />;
}
