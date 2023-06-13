import { EContractSectionItem } from '@/lib/consts/contracts';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IContractAddSectionModalProps = {
  openTab?: EContractSectionItem;
};

export type IContractAddSectionFormModalData = IContractAddSectionModalProps & {
  name: EModalName.AddSectionForm;
};
