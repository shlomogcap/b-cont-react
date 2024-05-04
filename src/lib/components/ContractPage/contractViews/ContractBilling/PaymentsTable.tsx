import { Button } from '@/lib/components/commons/Button';
import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { EPaymentFields } from '@/lib/consts/payments/PaymentFields';
import { PAYMENTS_DISPLAY_TEXTS } from '@/lib/consts/payments/displayTexts';
import { useContractContext } from '@/lib/context/contractContext';
import { StyledActionsRow } from '../ContractPlan/ContractPlan.styled';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export const PaymentsTable = () => {
  const { showModal } = useModalContext();
  const {
    data: { payments },
  } = useContractContext();
  return (
    <Table
      title={
        <StyledActionsRow>
          <Button
            onClick={() =>
              showModal({
                name: EModalName.PaymentForm,
              })
            }
          >
            +
          </Button>
        </StyledActionsRow>
      }
      columns={fieldsNamesToColumns(
        [
          EPaymentFields.PaymentDate,
          EPaymentFields.PaymentChannel,
          EPaymentFields.PaymentType,
          EPaymentFields.PaymentIdentifier,
          EPaymentFields.Sum,
        ],
        PAYMENTS_DISPLAY_TEXTS.he.fields,
      )}
      rows={payments}
    />
  );
};
