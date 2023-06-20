import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { IContractAddSectionModalProps } from '../ContractAddSectionModal';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';

export type IContractAddWorkspaceFormProps = Omit<
  IContractAddSectionModalProps,
  'openTab'
> & {
  workspace?: IWorkspaceDoc;
};

export type IContractAddWorkspaceFormFieldsProps = {
  workspacesOptions: IDropdownOption<string>[];
};
