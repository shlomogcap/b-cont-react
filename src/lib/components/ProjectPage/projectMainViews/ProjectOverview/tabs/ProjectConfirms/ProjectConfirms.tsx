import { IProjectConfirmsProps } from './ProjectConfirms.types';
import { Table } from '@/lib/components/commons/Table';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';

export const ProjectConfirms = (props: IProjectConfirmsProps) => {
  const { data: contracts, isLoading } = useProjectContractsContext();
  return (
    <Table
      loading={isLoading}
      columns={[
        { field: 'title', display: 'חוזה' },
        { field: 'status', display: 'סטטוס' },
        { field: 'vendorRef', display: 'קבלן מבצע' },
      ]}
      rows={contracts}
    />
  );
};
