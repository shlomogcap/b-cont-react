import { IContractSectionModalProps } from '../ContractSectionModal';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';

export type IContractSectionFormProps = Omit<
  IContractSectionModalProps,
  'openTab' | 'workspace'
>;

export type IContractSectionFormFieldsProps = {
  workspacesOptions: IDropdownOption<string>[];
};
