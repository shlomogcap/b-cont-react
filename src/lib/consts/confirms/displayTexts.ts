import { ILang } from '../displayTexts';
import { EConfirmFields } from './ConfirmFields';
import { EConfirmFlowControls } from './ConfirmFlowControls';
import { EConfirmStatus } from './ConfirmStatus';

type IDisplayTextMapping = {
  fields: Record<EConfirmFields, string>;
  confirmStatus: Record<EConfirmStatus, string>;
  confirmViewTitle: string;
  confirmViewControls: Record<EConfirmFlowControls, string>;
  showPeriodLabel: string;
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
    confirmViewTitle: 'סטטוס אישורי ביצוע',
    showPeriodLabel: 'חשבון תקופה',
    confirmViewControls: {
      [EConfirmFlowControls.Start]: 'אתחול',
      [EConfirmFlowControls.End]: 'יצירת תקופה חדשה',
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
    confirmViewTitle: 'Actual Confirms Status',
    showPeriodLabel: 'Actuals Period',
    confirmViewControls: {
      [EConfirmFlowControls.Start]: 'Start',
      [EConfirmFlowControls.End]: '+ New Period',
    },
  },
};
