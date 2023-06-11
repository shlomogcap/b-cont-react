import { indexOf } from 'lodash-es';
import { ISectionLevel } from './ReportTable.types';

const LEVELS_INDEX: ISectionLevel[] = ['main', 'secondary', 'tertiary'];

export const getLevelFromDepth = (depth: number): ISectionLevel => {
  return LEVELS_INDEX?.[depth - 1] ?? 'main';
};

export const getPrevLevel = (level: ISectionLevel): ISectionLevel =>
  LEVELS_INDEX[indexOf(LEVELS_INDEX, level) - 1] ?? 'main';
