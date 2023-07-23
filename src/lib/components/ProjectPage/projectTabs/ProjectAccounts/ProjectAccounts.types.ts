import { z } from 'zod';
import { projectAccountsFilterSchema } from './ProjectAccounts.consts';

export type IProjectAccountsProps = {};

export type IProjectAccountsFilterDoc = z.infer<
  typeof projectAccountsFilterSchema
>;
