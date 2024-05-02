import { z } from 'zod';
import { projectContractsFilterSchema } from './ProjectContracts.consts';

export type IProjectContractsProps = object;

export type IProjectContractsFilterDoc = z.infer<
  typeof projectContractsFilterSchema
>;
