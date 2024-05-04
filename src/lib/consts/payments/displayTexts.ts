import { ILang } from '../displayTexts';
import { EPaymentChannel } from './PaymentChannel';
import { EPaymentFields } from './PaymentFields';
import { EPaymentType } from './PaymentType';

type IDisplayTextMapping = {
  fields: Record<EPaymentFields, string>;
  paymentChannel: Record<EPaymentChannel, string>;
  paymentType: Record<EPaymentType, string>;
};

export const PAYMENTS_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    fields: {
      [EPaymentFields.PaymentDate]: 'תאריך תשלום',
      [EPaymentFields.Description]: 'תיאור',
      [EPaymentFields.PaymentChannel]: 'אמצעי תשלום',
      [EPaymentFields.PaymentType]: 'סוג תשלום',
      [EPaymentFields.PaymentIdentifier]: 'מזהה',
      [EPaymentFields.AccountRef]: 'מזהה חשבון',
      [EPaymentFields.Sum]: 'סכום',
    },
    paymentChannel: {
      [EPaymentChannel.Check]: 'שיק',
      [EPaymentChannel.Cash]: 'מזומן',
      [EPaymentChannel.Credit]: 'אשראי',
      [EPaymentChannel.BankTransfer]: 'העברה בנקאית',
      [EPaymentChannel.BankTransaction]: 'סליקה בנקאית',
      [EPaymentChannel.Other]: 'אחר',
    },
    paymentType: {
      [EPaymentType.DownPayment]: 'מקדמה',
      [EPaymentType.OnGoing]: 'שוטף',
    },
  },
  en: {
    fields: {
      [EPaymentFields.PaymentDate]: 'Payment Date',
      [EPaymentFields.Description]: 'Description',
      [EPaymentFields.PaymentChannel]: 'Payment Channel',
      [EPaymentFields.PaymentType]: 'Payment Type',
      [EPaymentFields.PaymentIdentifier]: 'Identifier',
      [EPaymentFields.AccountRef]: 'Account Ref',
      [EPaymentFields.Sum]: 'Sum',
    },
    paymentChannel: {
      [EPaymentChannel.Check]: 'Check',
      [EPaymentChannel.Cash]: 'Cash',
      [EPaymentChannel.Credit]: 'Credit',
      [EPaymentChannel.BankTransfer]: 'Bank Transfer',
      [EPaymentChannel.BankTransaction]: 'Bank Transaction',
      [EPaymentChannel.Other]: 'Other',
    },
    paymentType: {
      [EPaymentType.DownPayment]: 'Down Payment',
      [EPaymentType.OnGoing]: 'On Going',
    },
  },
};
