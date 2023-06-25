export const getNextIndex = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  field: K,
) => arr.reduce((acc, curr) => Math.max(acc, curr[field]), 0) + 1;
