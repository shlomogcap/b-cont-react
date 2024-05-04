import { IPaymentDoc } from '@/lib/consts/payments/PaymentDoc';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IPaymentFormProps = {
  readOnly?: boolean;
  payment?: IPaymentDoc;
};

export type IPaymentFormModalData = IPaymentFormProps & {
  name: EModalName.PaymentForm;
};
