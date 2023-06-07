import { PageLayout } from '../PageLayout';
import { BlocksGrid } from '../commons/BlocksGrid';
import { IBlocksGridProps } from '../commons/BlocksGrid/BlocksGrid.types';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { PROJECT_TYPES_ICON_MAPPING } from '../../consts/projects/projectTypeIconMapping';
import { ProjectType } from '../../consts/projects/ProjectType';
import { IRoutesNames, PROJECT_TYPE_QUERY } from '../../consts/routes';
import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';

const createProjectItems = (
  iconMap: typeof PROJECT_TYPES_ICON_MAPPING,
): IBlocksGridProps['items'] =>
  Object.entries(iconMap).map(([projectType, icon]) => ({
    id: projectType,
    icon,
    text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType as ProjectType],
    href: IRoutesNames.ProjectsWithType.replace(
      `[${PROJECT_TYPE_QUERY}]`,
      projectType,
    ),
  }));

export const ProjectsSplash = () => {
  return (
    <PageLayout
      title={DISPLAY_TEXTS.he.routeNames[IRoutesNames.ProjectsWithType]}
    >
      <BlocksGrid items={createProjectItems(PROJECT_TYPES_ICON_MAPPING)} />
    </PageLayout>
  );
};
