import { Button } from '@/lib/components/commons/Button';
import { Table } from '@/lib/components/commons/Table';
import { useContractContext } from '@/lib/context/contractContext';
import { StyledActionsRow } from '../ContractPlan/ContractPlan.styled';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { PAYMENTS_TABLE_COLUMNS } from './ContractBilling.consts';
import { IPaymentDoc } from '@/lib/consts/payments/PaymentDoc';

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
      columns={PAYMENTS_TABLE_COLUMNS}
      rows={payments}
      onRowClick={(paymentData) =>
        showModal({
          name: EModalName.PaymentForm,
          payment: paymentData as IPaymentDoc,
        })
      }
    />
  );
};
