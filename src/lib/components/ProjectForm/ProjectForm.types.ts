import { IProjectDoc } from '@/lib/consts/projects';
import Z from 'zod';

export type IProjectFormProps = {
  id?: string;
};

export type IProjectFormValues = IProjectDoc;
