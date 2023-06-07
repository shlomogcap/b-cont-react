import { IBreadcrumbProps } from '../components/PageLayout/Breadcrubms';
import { DISPLAY_TEXTS } from './displayTexts';
import { ProjectType } from './projects/ProjectType';
import { PROJECT_ID_QUERY, PROJECT_TYPE_QUERY, IRoutesNames } from './routes';

export const APP_BREADCRUMB: IBreadcrumbProps = {
  text: DISPLAY_TEXTS.he.routeNames[IRoutesNames.App],
  href: IRoutesNames.App,
  id: IRoutesNames.App,
};
export const VENDORS_BREADCRUMB: IBreadcrumbProps = {
  text: DISPLAY_TEXTS.he.routeNames[IRoutesNames.Vendors],
  href: IRoutesNames.Vendors,
  id: IRoutesNames.Vendors,
};

export const getProjectBredcrumb = (
  projectId: string,
  projectType: ProjectType,
  projectName?: string,
): IBreadcrumbProps => ({
  text: projectName ?? projectId,
  href: IRoutesNames.Project.replace(
    `[${PROJECT_ID_QUERY}]`,
    projectId,
  ).replace(`[${PROJECT_TYPE_QUERY}]`, projectType),
  id: IRoutesNames.Project,
});
