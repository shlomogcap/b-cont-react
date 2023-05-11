import { ParsedUrlQuery } from 'querystring';

export const queryParamToString = <T extends string = string>(
  query: ParsedUrlQuery,
  param: string,
) => {
  const paramValue = query[param];
  if (!paramValue) {
    return '' as T;
  }
  return Array.isArray(paramValue)
    ? (paramValue.join(',') as T)
    : (paramValue as T);
};
