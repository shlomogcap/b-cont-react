import { ProjectsPage } from '@/lib/components/ProjectsPage/ProjectsPage';
import { ProjectType } from '@/lib/consts/projectTypes';
import { PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const projectType: ProjectType | undefined = Array.isArray(
    ctx.query[PROJECT_TYPE_QUERY],
  )
    ? undefined
    : (ctx.query[PROJECT_TYPE_QUERY] as ProjectType);
  return {
    props: { projectType: projectType ?? '' },
  };
};

export default function ProjectPage({
  projectType,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { replace } = useRouter();
  useEffect(() => {
    if (
      !projectType ||
      Object.values(ProjectType).every((t) => t !== projectType)
    ) {
      replace({
        pathname: '/app',
      });
    }
  }, [replace, projectType]);
  return <ProjectsPage projectType={projectType} />;
}
