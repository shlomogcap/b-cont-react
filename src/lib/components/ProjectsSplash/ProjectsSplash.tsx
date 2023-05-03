import { PageLayout } from '../PageLayout';
import { BlocksGrid } from '../commons/BlocksGrid';
import { BlocksGridProps } from '../commons/BlocksGrid/BlocksGrid.types';
import { DISPLAY_TEXTS } from '../consts/displayTexts';
import { PROJECT_TYPES_ICON_MAPPING } from '../consts/projectTypeIconMapping';
import { ProjectType } from '../consts/projectTypes';
import { PROJECT_TYPE_QUERY, Routes } from '../consts/routes';

const createProjectItems = (
  iconMap: typeof PROJECT_TYPES_ICON_MAPPING,
): BlocksGridProps['items'] =>
  Object.entries(iconMap).map(([id, icon]) => ({
    id,
    icon,
    text: DISPLAY_TEXTS.he.projectType[id as ProjectType],
    href: `${Routes.Projects}?${PROJECT_TYPE_QUERY}=${id}`,
  }));

export const ProjectsSplash = () => {
  return (
    <PageLayout title={DISPLAY_TEXTS.he.routeNames[Routes.Projects]}>
      <BlocksGrid items={createProjectItems(PROJECT_TYPES_ICON_MAPPING)} />
    </PageLayout>
  );
};
