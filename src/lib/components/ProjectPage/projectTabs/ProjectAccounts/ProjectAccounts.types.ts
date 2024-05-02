import { z } from 'zod';
import { projectAccountsFilterSchema } from './ProjectAccounts.consts';

export type IProjectAccountsProps = object;

export type IProjectAccountsFilterDoc = z.infer<
  typeof projectAccountsFilterSchema
>;
