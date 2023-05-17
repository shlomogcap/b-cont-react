import { PageLayout } from '../PageLayout';
import { BlocksGrid } from '../commons/BlocksGrid';
import { IBlocksGridProps } from '../commons/BlocksGrid/BlocksGrid.types';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { PROJECT_TYPES_ICON_MAPPING } from '../../consts/projects/projectTypeIconMapping';
import { ProjectType } from '../../consts/projects/ProjectType';
import { Routes } from '../../consts/routes';

const createProjectItems = (
  iconMap: typeof PROJECT_TYPES_ICON_MAPPING,
): IBlocksGridProps['items'] =>
  Object.entries(iconMap).map(([projectType, icon]) => ({
    id: projectType,
    icon,
    text: DISPLAY_TEXTS.he.projectType[projectType as ProjectType],
    href: `${Routes.Projects}/${projectType}`,
  }));

export const ProjectsSplash = () => {
  return (
    <PageLayout title={DISPLAY_TEXTS.he.routeNames[Routes.Projects]}>
      <BlocksGrid items={createProjectItems(PROJECT_TYPES_ICON_MAPPING)} />
    </PageLayout>
  );
};
