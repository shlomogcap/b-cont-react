import { ProjectsPage } from '@/lib/components/ProjectsPage/ProjectsPage';
import { ProjectType } from '@/lib/components/consts/projectTypes';
import { PROJECT_TYPE_QUERY } from '@/lib/components/consts/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProjectPage() {
  const { query, replace } = useRouter();
  const projectType: ProjectType | undefined = Array.isArray(
    query[PROJECT_TYPE_QUERY],
  )
    ? undefined
    : (query[PROJECT_TYPE_QUERY] as ProjectType);
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
