import { indexOf } from 'lodash-es';
import { IReportTableSection, ISectionLevel } from './ReportTable.types';

const LEVELS_INDEX: ISectionLevel[] = ['main', 'secondary', 'tertiary'];

export const getLevelFromDepth = (depth: number): ISectionLevel => {
  return LEVELS_INDEX?.[depth - 1] ?? 'main';
};

export const getPrevLevel = (level: ISectionLevel): ISectionLevel =>
  LEVELS_INDEX[indexOf(LEVELS_INDEX, level) - 1] ?? 'main';

export const sumByRows = <T extends string>(
  reportData: IReportTableSection<T>[],
  propertyName: T,
): number => {
  let total = 0;
  const stack = [...reportData];

  while (stack.length > 0) {
    const currentSection = stack.pop();
    if (currentSection) {
      if (currentSection.rows) {
        total += currentSection.rows.reduce(
          (acc, row) => acc + (Number(row[propertyName]) || 0),
          0,
        );
      }
      if (currentSection.sections) {
        stack.push(...currentSection.sections);
      }
    }
  }

  return total;
};

export const avgByRows = <T extends string>(
  reportData: IReportTableSection<T>[],
  propertyName: T,
): number => {
  let sum = 0;
  let count = 0;
  const stack = [...reportData];

  while (stack.length > 0) {
    const currentSection = stack.pop();
    if (currentSection) {
      if (currentSection.rows) {
        currentSection.rows.forEach((row) => {
          if (typeof row[propertyName] === 'number') {
            sum += Number(row[propertyName]);
            count++;
          }
        });
      }
      if (currentSection.sections) {
        stack.push(...currentSection.sections);
      }
    }
  }

  return count > 0 ? sum / count : 0;
};
