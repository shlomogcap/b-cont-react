import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { Button } from '../commons/Button';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { EPeriodUnit } from '@/lib/consts/accounts/PeriodUnit';
import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  EContractActualsButtons,
} from './contractViews/ContractActuals/ContractActuals.consts';
import { IConfirmDoc } from '@/lib/consts/confirms/ConfirmDoc';

type FirstAccountButtonProps = {
  currentAccount: IAccountDoc;
  isActiveContract: boolean;
  confirmFlow: IConfirmDoc[];
};
export const FirstAccountButton = ({
  currentAccount,
  isActiveContract,
  confirmFlow,
}: FirstAccountButtonProps) => {
  const { showModal } = useModalContext();
  return (
    <Button
      onClick={() => {
        const [month, year] =
          String(currentAccount?.[EAccountFields.Period]).split(' ') ?? [];
        showModal({
          name: EModalName.PeriodSelectionForm,
          lastPeriod: `${year}-${Number(month) - 1}-1`,
          lastPeriodNumber: currentAccount?.[EAccountFields.PeriodNumber],
          periodUnit: EPeriodUnit.M,
          confirmFlow,
        });
      }}
      disabled={!isActiveContract}
    >
      {
        CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.buttons[
          EContractActualsButtons.CreateFirstAccount
        ]
      }
    </Button>
  );
};
