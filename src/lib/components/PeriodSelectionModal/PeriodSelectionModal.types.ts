import { EPeriodUnit } from '@/lib/consts/accounts/PeriodUnit';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IPeriodSelectionModalProps = {
  periodUnit: EPeriodUnit;
  currentPeriod: string;
};
export type IPeriodSelectionModalData = IPeriodSelectionModalProps & {
  name: EModalName.PeriodSelectionForm;
};
