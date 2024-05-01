export const toNumber = (nString: string | number) =>
  Number(String(nString).replace(/[^\d.-]/g, ''));
