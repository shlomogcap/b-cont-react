import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IEditUserFormModalProps = object;
export type IEditUserFormModalData = IEditUserFormModalProps & {
  name: EModalName.EditUserForm;
};
