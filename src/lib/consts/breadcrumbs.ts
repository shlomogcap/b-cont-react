import { IBreadcrumbProps } from '../components/PageLayout/Breadcrubms';
import { DISPLAY_TEXTS } from './displayTexts';
import { Routes } from './routes';

export const PROJECTS_BREADCRUMB: IBreadcrumbProps = {
  text: DISPLAY_TEXTS.he.routeNames[Routes.Projects],
  href: Routes.Projects,
  id: Routes.Projects,
};

export const getProjectBredcrumb = (
  projectId: string,
  projectName?: string,
): IBreadcrumbProps => ({
  text: projectName ?? projectId,
  href: Routes.Project.replace('[projectId]', projectId),
  id: Routes.Project,
});
