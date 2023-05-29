import { PageLayout } from '../PageLayout';
import { BlocksGrid } from '../commons/BlocksGrid';
import { IBlocksGridProps } from '../commons/BlocksGrid/BlocksGrid.types';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { PROJECT_TYPES_ICON_MAPPING } from '../../consts/projects/projectTypeIconMapping';
import { ProjectType } from '../../consts/projects/ProjectType';
import { IRoutesNames } from '../../consts/routes';
import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';

const createProjectItems = (
  iconMap: typeof PROJECT_TYPES_ICON_MAPPING,
): IBlocksGridProps['items'] =>
  Object.entries(iconMap).map(([projectType, icon]) => ({
    id: projectType,
    icon,
    text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType as ProjectType],
    href: `${IRoutesNames.Projects}/${projectType}`,
  }));

export const ProjectsSplash = () => {
  return (
    <PageLayout title={DISPLAY_TEXTS.he.routeNames[IRoutesNames.Projects]}>
      <BlocksGrid items={createProjectItems(PROJECT_TYPES_ICON_MAPPING)} />
    </PageLayout>
  );
};
