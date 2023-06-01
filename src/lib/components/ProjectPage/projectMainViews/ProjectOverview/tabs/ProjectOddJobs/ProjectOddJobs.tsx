import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { IProjectOddJobsProps } from './ProjectOddJobs.types';
import { useProjectOddJobsContext } from '@/lib/context/projectOddJobsContext';
import { IOddJobsFields } from '@/lib/consts/oddJobs/OddJobsFields';

export const ProjectOddJobs = (props: IProjectOddJobsProps) => {
  const { isLoading, data: oddJobs } = useProjectOddJobsContext();
  const columns: ITableColumn<IOddJobsFields>[] = [
    {
      field: IOddJobsFields.Title,
    },
    {
      field: IOddJobsFields.Description,
    },
  ];
  return <Table loading={isLoading} columns={columns} rows={oddJobs} />;
};
