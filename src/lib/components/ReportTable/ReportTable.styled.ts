import styled, { css } from 'styled-components';
import {
  StyledTable,
  StyledTableDataRow,
  StyledTableHeader,
  StyledTableHeaders,
} from '../commons/Table/Table.styled';
import { ISectionLevel } from './ReportTable.types';
import { getPrevLevel } from './ReportTable.utils';

type ISectionPart = 'title' | 'totals';
type IColors = string | { color: string; 'background-color': string };

type IColorosMapping = Record<ISectionLevel, Record<ISectionPart, IColors>>;

const SECTION_COLORS: IColorosMapping = {
  main: { title: 'var(--color-report-main)', totals: '#403151' },
  secondary: {
    title: 'var(--color-report-secondary)',
    totals: {
      color: '#403151',
      'background-color': '#ccc0da',
    },
  },
  tertiary: { title: '#6495edab', totals: '' },
};

export const StyledReportTable = styled(StyledTable)``;

export const StyledReportTableHeaders = styled(StyledTableHeaders)`
  background-color: navy;
  color: white;
`;

export const StyledReportTableHeader = styled(StyledTableHeader)``;

type StyledRowLevelProps = { level: ISectionLevel; actionable: boolean };

export const StyledSectionRowTitle = styled.div<StyledRowLevelProps>`
  background-color: ${({ level }) => SECTION_COLORS[level].title};
  text-align: center;
  grid-column: 1/-1;
  border-inline-start: 4px solid
    ${({ level }) => SECTION_COLORS[getPrevLevel(level)].title};

  ${({ actionable }) =>
    actionable &&
    css`
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        opacity: 0.8;
        text-decoration: underline;
        font-weight: 500;
      }
    `}
`;

export const StyledReportTableDataRow = styled(
  StyledTableDataRow,
)<StyledRowLevelProps>`
  border-inline-start: 4px solid
    ${({ level }) => SECTION_COLORS[getPrevLevel(level)].title};
`;
export const StyledReportTableTotalsRow = styled(
  StyledTableDataRow,
)<StyledRowLevelProps>`
  ${({ level }) => {
    const themeColor = SECTION_COLORS[getPrevLevel(level)].totals;
    return css`
      border-inline-start: 4px solid ${themeColor};
      background-color: ${themeColor};
      color: white;
      &:hover {
        background-color: ${themeColor};
      }
    `;
  }}
`;
