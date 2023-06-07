import { PageLayout } from '../PageLayout';
import { BlocksGrid } from '../commons/BlocksGrid';
import { IBlocksGridProps } from '../commons/BlocksGrid/BlocksGrid.types';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { IRoutesNames } from '../../consts/routes';
import {
  SETTINGS_ICON_MAPPING,
  SettingRoutes,
} from '@/lib/consts/settingsIconsMapping';

const createBlockGridItems = (
  iconMap: typeof SETTINGS_ICON_MAPPING,
): IBlocksGridProps['items'] =>
  Object.entries(iconMap).map(([settingsRoute, icon]) => ({
    id: settingsRoute,
    icon,
    text: DISPLAY_TEXTS.he.routeNames[settingsRoute as SettingRoutes],
    href: settingsRoute,
  }));

export const SettingsSplash = () => {
  return (
    <PageLayout title={DISPLAY_TEXTS.he.routeNames[IRoutesNames.Settings]}>
      <BlocksGrid items={createBlockGridItems(SETTINGS_ICON_MAPPING)} />
    </PageLayout>
  );
};
