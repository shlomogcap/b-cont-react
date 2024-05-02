import { Button } from '@/lib/components/commons/Button';
import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { EPaymentFields } from '@/lib/consts/payments/PaymentFields';
import { PAYMENTS_DISPLAY_TEXTS } from '@/lib/consts/payments/displayTexts';
import { useContractContext } from '@/lib/context/contractContext';
import { StyledActionsRow } from '../ContractPlan/ContractPlan.styled';

export const PaymentsTable = () => {
  const {
    data: { payments },
  } = useContractContext();
  return (
    <Table
      title={
        <StyledActionsRow>
          <Button>+</Button>
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
