import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { StyledContractPageRow } from './ContractPage.styled';
import { FirstAccountButton } from './FirstAccountButton';
import { ContractConfirms } from './ContractConfirms';
import { ChatCard } from '../commons/ChatCard';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  EContractActualsButtons,
} from './contractViews/ContractActuals/ContractActuals.consts';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';
import { EConfirmType } from '@/lib/consts/confirms/ConfirmType';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

type IContractProgressRowProps = {
  currentAccount: IAccountDoc;
  isActiveContract: boolean;
  confirmType: EConfirmType;
};

export const ContractProgressRow = ({
  currentAccount,
  isActiveContract,
  confirmType,
}: IContractProgressRowProps) => {
  const { showModal } = useModalContext();
  const { handleConfirmAccountStage, data: confirmFlow } =
    useProjectConfirmsSettingsContext();
  return (
    <StyledContractPageRow>
      {currentAccount ? (
        <ContractConfirms
          confirmType={confirmType}
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
        handleAddItem={() =>
          showModal({ name: EModalName.ContractCommentForm })
        }
      />
    </StyledContractPageRow>
  );
};
