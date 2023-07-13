import { z } from 'zod';
import { projectAccountsFilterSchema } from './ProjectAccounts.consts';

export type IProjectAccountsFilterDoc = z.infer<
  typeof projectAccountsFilterSchema
>;
