import { IContractCommentDoc } from '@/lib/consts/contractComments/ContractCommentDoc';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IContractCommentFormProps = {
  readOnly?: boolean;
  comment?: IContractCommentDoc;
};

export type IContractCommentFormData = IContractCommentFormProps & {
  name: EModalName.ContractCommentForm;
};
