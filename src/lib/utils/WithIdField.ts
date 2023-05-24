import { ID_FIELD } from '../consts/commonFields';

export type WithIdField<T extends {}> = T & { [ID_FIELD]: string };
