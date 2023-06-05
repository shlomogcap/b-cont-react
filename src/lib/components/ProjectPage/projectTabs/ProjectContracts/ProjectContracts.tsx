import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { IProjectContractsProps } from './ProjectContracts.types';
import {
  CONTRACTS_DISPLAY_TEXTS,
  IContractFields,
} from '@/lib/consts/contracts';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import {
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
} from './ProjectContracts.consts';
import { useRouter } from 'next/router';
import {
  CONTRACT_ID_QUERY,
  IRoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';

export const ProjectContracts = (props_: IProjectContractsProps) => {
  const { data: rows, isLoading } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const projectType = queryParamToString(router.query, PROJECT_TYPE_QUERY);
  return (
    <Table
      loading={isLoading}
      columns={fieldsNamesToColumns(
        [
          IContractFields.Title,
          {
            field: IContractFields.Status,
            type: 'list',
            options: CONTRACT_STATUS_OPTIONS,
          },
          {
            field: IContractFields.VendorRef,
            getValue: ({ row, field }) =>
              vendors.find(({ id }) => row[field] === id)?.title ??
              FALLBACK_BROKEN_REF_TEXT,
          },
          IContractFields.BudgetbudgetaryItem,
          { field: IContractFields.TotalAgreementSum, type: 'number' },
          {
            field: IContractFields.ContractType,
            type: 'list',
            options: CONTRACT_TYPE_OPTIONS,
          },
        ],
        CONTRACTS_DISPLAY_TEXTS.he.fields,
      )}
      rows={rows}
      onRowClick={({ id }) =>
        router.push({
          pathname: IRoutesNames.Contract,
          query: {
            [PROJECT_TYPE_QUERY]: projectType,
            [PROJECT_ID_QUERY]: projectId,
            [CONTRACT_ID_QUERY]: id,
          },
        })
      }
    />
  );
};
