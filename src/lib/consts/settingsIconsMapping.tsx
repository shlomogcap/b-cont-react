import { ReactElement } from 'react';
import { HomeIcon } from '../components/icons/HomeIcon';
import { PaymentsIcon } from '../components/icons/PaymentsIcon';
import { ProfileIcon } from '../components/icons/ProfileIcon';
import { ERoutesNames } from './routes';

export type ISettingRoutes = Extract<
  ERoutesNames,
  ERoutesNames.Me | ERoutesNames.Budget | ERoutesNames.Company
>;

export const SETTINGS_ICON_MAPPING: Record<ISettingRoutes, ReactElement> = {
  [ERoutesNames.Me]: <ProfileIcon />,
  [ERoutesNames.Company]: <HomeIcon />,
  [ERoutesNames.Budget]: <PaymentsIcon />,
};
