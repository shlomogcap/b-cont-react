import { EConfirmFlowControls } from '@/lib/consts/confirms/ConfirmFlowControls';
import { StyledContractPageRow } from '../ContractPage.styled';
import { Button } from '../../commons/Button';
import { useContractContext } from '@/lib/context/contractContext';
import { IConfirmDoc } from '@/lib/consts/confirms/ConfirmDoc';
import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';

type IContractActionsRowProps = {
  isActiveContract: boolean;
  confirmFlow: IConfirmDoc[];
  currentAccount: IAccountDoc;
  currentStage: string;
};

export const ContractActionsRow = ({
  isActiveContract,
  confirmFlow,
  currentAccount,
  currentStage,
}: IContractActionsRowProps) => {
  const {
    data: { handleChangeContractToPlan },
  } = useContractContext();
  const { handleConfirmAccountStage } = useProjectConfirmsSettingsContext();
  const currentConfirmFlow = confirmFlow.find(
    (flow) => flow.id === currentStage,
  );
  return (
    <StyledContractPageRow style={{ justifyContent: 'flex-end' }}>
      {currentStage &&
        ![EConfirmFlowControls.Start, EConfirmFlowControls.End].includes(
          currentStage as EConfirmFlowControls,
        ) && (
          <Button
            onClick={() =>
              handleConfirmAccountStage({ confirmFlow, currentAccount })
            }
            style={{ justifySelf: 'center', minWidth: 'max-content' }}
            disabled={!isActiveContract}
          >
            {currentConfirmFlow?.title}
          </Button>
        )}
      {isActiveContract && (
        <Button onClick={handleChangeContractToPlan}>Go To Plan View</Button>
      )}
    </StyledContractPageRow>
  );
};
