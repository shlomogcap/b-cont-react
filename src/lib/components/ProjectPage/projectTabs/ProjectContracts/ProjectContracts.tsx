import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { IProjectContractsProps } from './ProjectContracts.types';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractFields,
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
  ERoutesNames,
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
          EContractFields.Title,
          {
            field: EContractFields.Status,
            type: 'list',
            options: CONTRACT_STATUS_OPTIONS,
          },
          {
            field: EContractFields.VendorRef,
            getValue: ({ row, field }) =>
              vendors.find(({ id }) => row[field] === id)?.title ??
              FALLBACK_BROKEN_REF_TEXT,
          },
          EContractFields.BudgetbudgetaryItem,
          { field: EContractFields.TotalAgreementSum, type: 'number' },
          {
            field: EContractFields.ContractType,
            type: 'list',
            options: CONTRACT_TYPE_OPTIONS,
          },
        ],
        CONTRACTS_DISPLAY_TEXTS.he.fields,
      )}
      rows={rows}
      onRowClick={({ id }) =>
        router.push({
          pathname: ERoutesNames.Contract,
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
