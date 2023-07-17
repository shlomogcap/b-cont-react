import { z } from 'zod';
import { projectConfirmsFilterSchema } from './ProjectConfirms.consts';

export type IProjectConfirmsProps = {};

export type IProjectConfirmsFilterDoc = z.infer<
  typeof projectConfirmsFilterSchema
>;
