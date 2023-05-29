import { ReactElement } from 'react';
import { HomeIcon } from '../components/icons/HomeIcon';
import { PaymentsIcon } from '../components/icons/PaymentsIcon';
import { ProfileIcon } from '../components/icons/ProfileIcon';
import { IRoutesNames } from './routes';

export type SettingRoutes = Extract<
  IRoutesNames,
  IRoutesNames.Me | IRoutesNames.Budget | IRoutesNames.Company
>;

export const SETTINGS_ICON_MAPPING: Record<SettingRoutes, ReactElement> = {
  [IRoutesNames.Me]: <ProfileIcon />,
  [IRoutesNames.Company]: <HomeIcon />,
  [IRoutesNames.Budget]: <PaymentsIcon />,
};
