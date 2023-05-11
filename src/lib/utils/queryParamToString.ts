import { ParsedUrlQuery } from 'querystring';

export const queryParamToString = (query: ParsedUrlQuery, param: string) => {
  const paramValue = query[param];
  if (!paramValue) {
    return '';
  }
  return Array.isArray(paramValue) ? paramValue.join(',') : paramValue;
};
