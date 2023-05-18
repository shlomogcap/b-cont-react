import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';
import { IProjectPageProps } from './ProjectsPage.types';
import { useRouter } from 'next/router';
import { ProjectsTable } from './ProjectsTable';
import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';

export const ProjectsPage = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();

  const title = projectType
    ? PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType]
    : DISPLAY_TEXTS.he.routeNames[Routes.Projects];

  return (
    <PageLayout title={title}>
      <ProjectsTable projectType={projectType} />
    </PageLayout>
  );
};
