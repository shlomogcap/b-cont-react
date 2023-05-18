import { ReactElement } from 'react';
import { HomeIcon } from '../components/icons/HomeIcon';
import { PaymentsIcon } from '../components/icons/PaymentsIcon';
import { ProfileIcon } from '../components/icons/ProfileIcon';
import { Routes } from './Routes';

export type SettingRoutes = Extract<
  Routes,
  Routes.Me | Routes.Budget | Routes.Company
>;

export const SETTINGS_ICON_MAPPING: Record<SettingRoutes, ReactElement> = {
  [Routes.Me]: <ProfileIcon />,
  [Routes.Company]: <HomeIcon />,
  [Routes.Budget]: <PaymentsIcon />,
};
