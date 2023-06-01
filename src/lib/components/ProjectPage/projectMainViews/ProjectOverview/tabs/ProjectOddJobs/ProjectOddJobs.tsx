import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { IProjectOddJobsProps } from './ProjectOddJobs.types';
import { useProjectOddJobsContext } from '@/lib/context/projectOddJobsContext';
import { IOddJobsFields } from '@/lib/consts/oddJobs/OddJobsFields';
import { ODD_JOBS_DISPLAY_TEXTS } from '@/lib/consts/oddJobs/displayTexts';
import { ODD_JOBS_STATUS_OPTIONS } from './ProjectOddJobs.consts';

export const ProjectOddJobs = (props: IProjectOddJobsProps) => {
  const { isLoading, data: oddJobs } = useProjectOddJobsContext();
  const columns: ITableColumn<IOddJobsFields>[] = [
    {
      field: IOddJobsFields.Title,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[IOddJobsFields.Title],
    },
    {
      field: IOddJobsFields.Description,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[IOddJobsFields.Description],
    },
    {
      field: IOddJobsFields.Status,
      display: ODD_JOBS_DISPLAY_TEXTS.he.fields[IOddJobsFields.Status],
      type: 'list',
      options: ODD_JOBS_STATUS_OPTIONS,
    },
  ];
  return <Table loading={isLoading} columns={columns} rows={oddJobs} />;
};
