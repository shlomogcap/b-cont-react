import { EPeriodUnit } from '@/lib/consts/accounts/PeriodUnit';
import { IConfirmDoc } from '@/lib/consts/confirms/ConfirmDoc';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IPeriodSelectionModalProps = {
  periodUnit: EPeriodUnit;
  lastPeriod: string;
  lastPeriodNumber?: number;
  confirmFlow: IConfirmDoc[];
};
export type IPeriodSelectionModalData = IPeriodSelectionModalProps & {
  name: EModalName.PeriodSelectionForm;
};
