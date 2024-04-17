export const getFullPathNoQuery = (path: string) => path.split('?')[0];

export const extractParentPath = (path: string): string => {
  const sections = path.split('/');
  const parentSections = sections.slice(0, -2);
  return parentSections.join('/');
};
