import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { StyledContractPageRow } from '../ContractPage.styled';
import { FirstAccountButton } from './FirstAccountButton';
import { IConfirmDoc } from '@/lib/consts/confirms/ConfirmDoc';
import { ContractConfirms } from './ContractConfirms';
import { ChatCard } from '../../commons/ChatCard';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  EContractActualsButtons,
} from './ContractActuals/ContractActuals.consts';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';

type IContractProgressRowProps = {
  currentAccount: IAccountDoc;
  isActiveContract: boolean;
};

export const ContractProgressRow = ({
  currentAccount,
  isActiveContract,
}: IContractProgressRowProps) => {
  const { handleConfirmAccountStage, data: confirmFlow } =
    useProjectConfirmsSettingsContext();
  return (
    <StyledContractPageRow>
      {currentAccount ? (
        <ContractConfirms
          confirmEnabled={isActiveContract}
          account={currentAccount}
          handleConfirmAccountStage={() =>
            handleConfirmAccountStage({
              currentAccount,
              confirmFlow,
            })
          }
        />
      ) : (
        <FirstAccountButton
          currentAccount={currentAccount!}
          isActiveContract={isActiveContract}
          confirmFlow={confirmFlow}
        />
      )}
      <ChatCard
        title={CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.chatBlockTitle}
        addNewText={
          CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.buttons[
            EContractActualsButtons.AddNewComment
          ]
        }
      />
    </StyledContractPageRow>
  );
};
