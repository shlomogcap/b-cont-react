import { IContractAddSectionModalProps } from '../ContractAddSectionModal';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';

export type IContractSectionFormProps = Omit<
  IContractAddSectionModalProps,
  'openTab'
>;

export type IContractSectionFormFieldsProps = {
  workspacesOptions: IDropdownOption<string>[];
  groupsOptions: IDropdownOption<string>[];
};
