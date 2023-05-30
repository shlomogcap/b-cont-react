import { ProjectPage } from '@/lib/components/ProjectPage/ProjectPage';
import { ProjectContractsCard } from '@/lib/components/ProjectPage/projectMainViews/ProjectOverview/tabs';
import { PROJECT_ID_QUERY, PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { ProjectContractsProvider } from '@/lib/context/projectContractsContext';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProjectRoute() {
  const { query } = useRouter();
  const projectId = queryParamToString(query, PROJECT_ID_QUERY);
  return (
    <ProjectContractsProvider projectId={projectId}>
      <ProjectPage
        projectId={projectId}
        projectType={queryParamToString(query, PROJECT_TYPE_QUERY)}
      />
    </ProjectContractsProvider>
  );
}
