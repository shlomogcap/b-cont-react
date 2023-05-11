import { IBreadcrumbProps } from '../components/PageLayout/Breadcrubms';
import { DISPLAY_TEXTS } from './displayTexts';
import { ProjectType } from './projectTypes';
import { PROJECT_ID_QUERY, PROJECT_TYPE_QUERY, Routes } from './routes';

export const PROJECTS_BREADCRUMB: IBreadcrumbProps = {
  text: DISPLAY_TEXTS.he.routeNames[Routes.Projects],
  href: Routes.Projects,
  id: Routes.Projects,
};

export const getProjectBredcrumb = (
  projectId: string,
  projectType: ProjectType,
  projectName?: string,
): IBreadcrumbProps => ({
  text: projectName ?? projectId,
  href: Routes.Project.replace(`[${PROJECT_ID_QUERY}]`, projectId).replace(
    `[${PROJECT_TYPE_QUERY}]`,
    projectType,
  ),
  id: Routes.Project,
});
