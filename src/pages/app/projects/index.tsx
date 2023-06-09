import { ProjectsPage } from '@/lib/components/ProjectsPage';
import { EProjectType } from '@/lib/consts/projects/ProjectType';
import { PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps<{
  projectType: EProjectType;
}> = async (ctx) => {
  const projectType = queryParamToString<EProjectType>(
    ctx.query,
    PROJECT_TYPE_QUERY,
  );
  return {
    props: { projectType },
  };
};

export default function ProjectsRoute({
  projectType,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { replace } = useRouter();
  useEffect(() => {
    if (
      !projectType ||
      Object.values(EProjectType).every((t) => t !== projectType)
    ) {
      replace({
        pathname: '/app',
      });
    }
  }, [replace, projectType]);
  return <ProjectsPage projectType={projectType} />;
}
