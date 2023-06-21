import { getDisplayValue } from '../commons/Table';
import { StyledTableBar, StyledTableCell } from '../commons/Table/Table.styled';
import {
  StyledReportTable,
  StyledReportTableDataRow,
  StyledReportTableHeader,
  StyledReportTableHeaders,
  StyledSectionRowTitle,
} from './ReportTable.styled';
import { IReportSectionProps, IReportTableProps } from './ReportTable.types';
import { getLevelFromDepth } from './ReportTable.utils';

const ReportSection = <T extends string>({
  depth,
  section,
  loading,
  columns,
  onRowClick,
  onSectionClick,
}: IReportSectionProps<T>) => {
  if (depth > 3) {
    throw 'Inavlid Nested Sections , Nesting Sections is limit to 3 levels only';
  }
  const level = section.level ?? getLevelFromDepth(depth);
  return (
    <>
      <StyledSectionRowTitle
        actionable={Boolean(onSectionClick)}
        level={level}
        onClick={(e) => {
          e.stopPropagation();
          onSectionClick?.(section);
        }}
      >
        {section.title}
      </StyledSectionRowTitle>
      {!loading &&
        section?.rows?.map((row) => (
          <StyledReportTableDataRow
            actionable={Boolean(onRowClick)}
            level={level}
            onClick={(e) => {
              e.stopPropagation();
              onRowClick?.({ ...row });
            }}
            key={row.id}
            templateColumns={columns.map(() => '1fr').join(' ')}
          >
            {columns.map(({ field, fieldPath, getValue, ...rest }) => (
              <StyledTableCell key={`${row.id}/${fieldPath ?? field}`}>
                {getDisplayValue({
                  value: getValue?.({ row, field }) ?? row?.[field],
                  ...rest,
                }) ?? ''}
              </StyledTableCell>
            ))}
          </StyledReportTableDataRow>
        ))}
      {!loading &&
        depth <= 3 &&
        section?.sections?.map((section, index) => (
          <ReportSection
            depth={depth + 1}
            key={`section/${index + depth}`}
            section={section}
            loading={loading}
            columns={columns}
            onRowClick={onRowClick}
          />
        ))}
    </>
  );
};

export const ReportTable = <T extends string = string>({
  columns,
  sections,
  loading,
  onRowClick,
  onSectionClick,
  title,
  className,
}: IReportTableProps<T>) => {
  return (
    <StyledReportTable className={className}>
      {title && <StyledTableBar>{title}</StyledTableBar>}
      <StyledReportTableHeaders
        templateColumns={columns.map(() => '1fr').join(' ')}
      >
        {columns.map(({ field, display, fieldPath }) => (
          <StyledReportTableHeader key={`headers/${fieldPath ?? field}`}>
            {display ?? field}
          </StyledReportTableHeader>
        ))}
      </StyledReportTableHeaders>
      {sections.map((section, index) => (
        <ReportSection
          depth={1}
          key={`section/${index}`}
          section={section}
          loading={loading}
          columns={columns}
          onRowClick={onRowClick}
          onSectionClick={onSectionClick}
        />
      ))}
    </StyledReportTable>
  );
};
