import { Modal } from '../commons/Modal';
import { IContractSectionFormModalData } from './ContractSectionForm.types';
import {
  IContractSectionFormModalProps,
  IContractSectionFormProps,
} from './ContractSectionForm.types';

export const ContractSectionForm = (props: IContractSectionFormProps) => {
  return <>TODO: create contract section form</>;
};

export const ContractSectionFormModal = (
  props: IContractSectionFormModalData,
) => {
  return (
    <Modal>
      <ContractSectionForm />
    </Modal>
  );
};
