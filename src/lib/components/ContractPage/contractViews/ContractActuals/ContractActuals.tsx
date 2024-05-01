import { IContractActualsProps } from './ContractActuals.types';
import { ReportTable } from '@/lib/components/ReportTable';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  columns,
} from './ContractActuals.consts';
import { prepareContractActualsReport } from './ContractActuals.utils';
import { useContractContext } from '@/lib/context/contractContext';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { EConfirmStatus } from '@/lib/consts/confirms/ConfirmStatus';
import { EConfirmFields } from '@/lib/consts/confirms/ConfirmFields';
import dayjs from 'dayjs';
import { EConfirmFlowControls } from '@/lib/consts/confirms/ConfirmFlowControls';
import {
  EContractFields,
  EContractStage,
  EContractStatus,
} from '@/lib/consts/contracts';
import { showToastError } from '@/lib/utils/showToastError';
import { useRouter } from 'next/router';
import {
  CONTRACT_STAGE_QUERY,
  ERoutesNames,
  SECTION_ID_QUERY,
} from '@/lib/consts/routes';
import { FirstAccountButton } from '../FirstAccountButton';
import { StyledContractPageRow } from '../../ContractPage.styled';
import { ContractProgressRow } from '../ContractProgressRow';
import { ContractActionsRow } from '../ContractActionsRow';

export const ContractActuals = (props: IContractActualsProps) => {
  const router = useRouter();
  const { data: confirmFlow } = useProjectConfirmsSettingsContext();
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
        confirmFlow={confirmFlow}
        currentAccount={currentAccount!}
        isActiveContract={isActiveContract}
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
        confirmFlow={confirmFlow}
        currentAccount={currentAccount!}
        currentStage={currentStage!}
        isActiveContract={isActiveContract}
      />
    </>
  );
};
