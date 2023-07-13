import { z } from 'zod';
import { projectConfirmsFilterSchema } from './ProjectConfirms.consts';

export type IProjectConfirmsFilterDoc = z.infer<
  typeof projectConfirmsFilterSchema
>;
