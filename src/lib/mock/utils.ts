export const PATH_FIELD = 'path';

export type TWithPathField<T> = T & { [PATH_FIELD]: string };
