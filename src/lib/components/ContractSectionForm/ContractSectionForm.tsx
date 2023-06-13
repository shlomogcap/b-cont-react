import { Modal } from '../commons/Modal';
import { IContractSectionFormModalData } from './ContractSectionForm.types';
import { IContractSectionFormProps } from './ContractSectionForm.types';

export const ContractSectionForm = (props: IContractSectionFormProps) => {
  return <>TODO: create contract section form ({props.openTab})</>;
};

export const ContractSectionFormModal = (
  props: IContractSectionFormModalData,
) => {
  return (
    <Modal>
      <ContractSectionForm {...props} />
    </Modal>
  );
};
