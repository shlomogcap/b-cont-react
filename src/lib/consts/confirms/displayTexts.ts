import { ILang } from '../displayTexts';
import { EConfirmFields } from './ConfirmFields';
import { EConfirmStatus } from './ConfirmStatus';

type IDisplayTextMapping = {
  fields: Record<EConfirmFields, string>;
  confirmStatus: Record<EConfirmStatus, string>;
};

export const CONFIRMS_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    fields: {
      [EConfirmFields.Title]: 'כותרת',
      [EConfirmFields.OrderIndex]: '#',
      [EConfirmFields.UserRole]: 'גורם מאשר',
      [EConfirmFields.Due]: 'יום בחודש',
      [EConfirmFields.ConfirmType]: 'סוג',
      [EConfirmFields.NextConfirm]: 'גורם הבא בסבב',
      [EConfirmFields.ConfirmStatus]: 'סטטוס',
      [EConfirmFields.ApprovedAt]: 'אושר ב',
      [EConfirmFields.ApprovedBy]: 'אישור',
    },
    confirmStatus: {
      [EConfirmStatus.Pending]: 'ממתין לאישור',
      [EConfirmStatus.Hold]: 'בהקפאה',
      [EConfirmStatus.Approve]: 'אושר',
      [EConfirmStatus.Reject]: 'נדחה',
    },
  },
  en: {
    fields: {
      [EConfirmFields.Title]: 'Title',
      [EConfirmFields.OrderIndex]: 'OrderIndex',
      [EConfirmFields.UserRole]: 'UserRole',
      [EConfirmFields.Due]: 'Due',
      [EConfirmFields.ConfirmType]: 'ConfirmType',
      [EConfirmFields.NextConfirm]: 'NextConfirm',
      [EConfirmFields.ConfirmStatus]: 'ConfirmStatus',
      [EConfirmFields.ApprovedAt]: 'ApprovedAt',
      [EConfirmFields.ApprovedBy]: 'ApprovedBy',
    },
    confirmStatus: {
      [EConfirmStatus.Pending]: 'pending',
      [EConfirmStatus.Hold]: 'hold',
      [EConfirmStatus.Approve]: 'approve',
      [EConfirmStatus.Reject]: 'reject',
    },
  },
};
