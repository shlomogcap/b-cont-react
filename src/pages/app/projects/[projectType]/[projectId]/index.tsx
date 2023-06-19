import { ProjectPage } from '@/lib/components/ProjectPage/ProjectPage';
import { EProjectType } from '@/lib/consts/projects';
import { PROJECT_ID_QUERY, PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { ProjectContractsProvider } from '@/lib/context/projectContractsContext';
import { ProjectOddJobsProvider } from '@/lib/context/projectOddJobsContext';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { GetServerSideProps } from 'next';
import React from 'react';

type IProjectRouteProps = {
  projectType: EProjectType;
  projectId: string;
};

export default function ProjectRoute({
  projectId,
  projectType,
}: IProjectRouteProps) {
  return (
    <ProjectContractsProvider projectId={projectId}>
      <ProjectOddJobsProvider projectId={projectId}>
        <ProjectContractsProvider projectId={projectId}>
          <ProjectPage projectId={projectId} projectType={projectType} />
        </ProjectContractsProvider>
      </ProjectOddJobsProvider>
    </ProjectContractsProvider>
  );
}

export const getServerSideProps: GetServerSideProps<
  IProjectRouteProps
> = async (ctx) => {
  const projectType = queryParamToString<EProjectType>(
    ctx.query,
    PROJECT_TYPE_QUERY,
  );
  const projectId = queryParamToString(ctx.query, PROJECT_ID_QUERY);
  return {
    props: { projectType, projectId },
  };
};
