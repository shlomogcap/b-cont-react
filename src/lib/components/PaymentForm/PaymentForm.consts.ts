import { EPaymentChannel } from '@/lib/consts/payments/PaymentChannel';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';
import { PAYMENTS_DISPLAY_TEXTS } from '@/lib/consts/payments/displayTexts';
import { EPaymentType } from '@/lib/consts/payments/PaymentType';

export const PAYMENT_CHANNEL_OPTIONS: IDropdownInputProps['options'] =
  Object.values(EPaymentChannel).map((value) => ({
    value,
    text: PAYMENTS_DISPLAY_TEXTS.he.paymentChannel[value],
  }));
export const PAYMENT_TYPE_OPTIONS: IDropdownInputProps['options'] =
  Object.values(EPaymentType).map((value) => ({
    value,
    text: PAYMENTS_DISPLAY_TEXTS.he.paymentType[value],
  }));
