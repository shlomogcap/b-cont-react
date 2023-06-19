import { IBreadcrumbProps } from '../components/PageLayout/Breadcrubms';
import { DISPLAY_TEXTS } from './displayTexts';
import { EProjectType } from './projects/ProjectType';
import { PROJECT_ID_QUERY, PROJECT_TYPE_QUERY, ERoutesNames } from './routes';

export const APP_BREADCRUMB: IBreadcrumbProps = {
  text: DISPLAY_TEXTS.he.routeNames[ERoutesNames.App],
  href: ERoutesNames.App,
  id: ERoutesNames.App,
};
export const VENDORS_BREADCRUMB: IBreadcrumbProps = {
  text: DISPLAY_TEXTS.he.routeNames[ERoutesNames.Vendors],
  href: ERoutesNames.Vendors,
  id: ERoutesNames.Vendors,
};

export const getProjectBredcrumb = (
  projectId: string,
  projectType: EProjectType,
  projectName?: string,
): IBreadcrumbProps => ({
  text: projectName ?? projectId,
  href: ERoutesNames.Project.replace(
    `[${PROJECT_ID_QUERY}]`,
    projectId,
  ).replace(`[${PROJECT_TYPE_QUERY}]`, projectType),
  id: ERoutesNames.Project,
});
