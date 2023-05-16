import Z from 'zod';
import { projectFormSchema } from './ProjectForm.consts';

export type IProjectFormProps = {};

export type ProjectFormValues = Z.infer<typeof projectFormSchema>;
