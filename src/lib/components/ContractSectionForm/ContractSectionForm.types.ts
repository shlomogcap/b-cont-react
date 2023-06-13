import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IContractSectionFormModalProps = {
  openTab?: 'section' | 'workspace' | 'sectionsGroup';
};

export type IContractSectionFormProps = Pick<
  IContractSectionFormModalProps,
  'openTab'
>;

export type IContractSectionFormModalData = IContractSectionFormModalProps & {
  name: EModalName.SectionForm;
};
