import { ILang } from '../displayTexts';
import { EPaymentFields } from './PaymentFields';

type IDisplayTextMapping = {
  fields: Record<EPaymentFields, string>;
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
  },
};
