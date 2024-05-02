import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { IProjectOddJobsProps } from './ProjectOddJobs.types';
import { useProjectOddJobsContext } from '@/lib/context/projectOddJobsContext';
import { EOddJobsFields } from '@/lib/consts/oddJobs/OddJobsFields';
import { ODD_JOBS_DISPLAY_TEXTS } from '@/lib/consts/oddJobs/displayTexts';
import { ODD_JOBS_STATUS_OPTIONS } from './ProjectOddJobs.consts';

export const ProjectOddJobs = (_props: IProjectOddJobsProps) => {
  const { isLoading, data: oddJobs } = useProjectOddJobsContext();
  const columns: ITableColumn<EOddJobsFields>[] = [
    {
      field: EOddJobsFields.Title,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.Title],
    },
    {
      field: EOddJobsFields.InvoiceNumber,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.InvoiceNumber],
    },
    {
      field: EOddJobsFields.InvoiceDate,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.InvoiceDate],
      type: 'date',
    },
    {
      field: EOddJobsFields.SumBeforeTax,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.SumBeforeTax],
      type: 'number',
    },
    {
      field: EOddJobsFields.Description,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.Description],
    },
    {
      field: EOddJobsFields.Status,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.Status],
      type: 'list',
      options: ODD_JOBS_STATUS_OPTIONS,
    },
    {
      field: EOddJobsFields.ApprovalSumBeforeTax,
      display:
        ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.ApprovalSumBeforeTax],
      type: 'number',
    },
    {
      field: EOddJobsFields.PaymentDue,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.PaymentDue],
      type: 'number',
    },
    {
      field: EOddJobsFields.PaymentDate,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[EOddJobsFields.PaymentDate],
      type: 'date',
    },
  ];
  return <Table loading={isLoading} columns={columns} rows={oddJobs} />;
};
