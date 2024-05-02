import { IContractActualsProps } from './ContractActuals.types';
import { ReportTable } from '@/lib/components/ReportTable';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  columns,
} from './ContractActuals.consts';
import { prepareContractActualsReport } from './ContractActuals.utils';
import { useContractContext } from '@/lib/context/contractContext';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { EContractFields, EContractStatus } from '@/lib/consts/contracts';
import { useRouter } from 'next/router';
import { ERoutesNames, SECTION_ID_QUERY } from '@/lib/consts/routes';
import { ContractProgressRow } from '../../ContractProgressRow';
import { ContractActionsRow } from '../../ContractActionsRow';
import { EConfirmType } from '@/lib/consts/confirms/ConfirmType';

export const ContractActuals = (_props: IContractActualsProps) => {
  const router = useRouter();
  const {
    data: { contract, accounts, sections, workspaces, actuals },
    isLoading,
  } = useContractContext();
  const currentAccount =
    accounts.length > 0
      ? accounts.reduce((prev, curr) =>
          curr[EAccountFields.PeriodNumber] > prev[EAccountFields.PeriodNumber]
            ? curr
            : prev,
        )
      : null;

  const currentStage = currentAccount?.[EAccountFields.AccountStage];
  const isActiveContract =
    contract![EContractFields.Status] === EContractStatus.Active;

  return isLoading ? null : (
    <>
      <ContractProgressRow
        currentAccount={currentAccount!}
        isActiveContract={isActiveContract}
        confirmType={EConfirmType.Actual}
      />
      <ReportTable
        columns={columns}
        sections={prepareContractActualsReport({
          contract: contract!,
          accounts,
          currentAccount: currentAccount!,
          contractSections: sections,
          workspaces,
          actuals,
        })}
        title={CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.reportTitle}
        onRowClick={({ id }) => {
          router.push({
            pathname: ERoutesNames.SectionActual,
            query: {
              ...router.query,
              [SECTION_ID_QUERY]: id,
            },
          });
        }}
      />
      <ContractActionsRow
        currentAccount={currentAccount!}
        currentStage={currentStage!}
        isActiveContract={isActiveContract}
      />
    </>
  );
};
