import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { IProjectContractsProps } from './ProjectContracts.types';
import {
  CONTRACTS_DISPLAY_TEXTS,
  IContractFields,
  IContractStatus,
  IContractType,
} from '@/lib/consts/contracts';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { useVendorsContext } from '@/lib/context/vendorsContext';

export const ProjectContracts = (props_: IProjectContractsProps) => {
  const { data: rows, isLoading } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();
  return (
    <Table
      loading={isLoading}
      columns={fieldsNamesToColumns(
        [
          IContractFields.Title,
          {
            field: IContractFields.Status,
            type: 'list',
            options: [IContractStatus.Active, IContractStatus.Active].map(
              (contractStatus) => ({
                text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[contractStatus],
                value: contractStatus,
              }),
            ),
          },
          {
            field: IContractFields.VendorRef,
            getValue: ({ row }) =>
              vendors.find(({ id }) => row.id === id)?.title ?? '---',
          },
          IContractFields.BudgetbudgetaryItem,
          { field: IContractFields.TotalAgreementSum, type: 'number' },
          {
            field: IContractFields.ContractType,
            type: 'list',
            options: [
              IContractType.Pauschal,
              IContractType.Amount,
              IContractType.Rent,
              IContractType.Invoice,
              IContractType.Kitchen,
            ].map((contractType) => ({
              text: CONTRACTS_DISPLAY_TEXTS.he.contractType[contractType],
              value: contractType,
            })),
          },
        ],
        CONTRACTS_DISPLAY_TEXTS.he.fields,
      )}
      rows={rows}
    />
  );
};
