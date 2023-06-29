import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';
import { IContractSectionModalProps } from '../ContractSectionModal';

type IOnSavedFuncArgs = Partial<IWorkspaceDoc>;
type IOnSavedFunc = (args?: IOnSavedFuncArgs) => void;

export type IContractAddWorkspaceFormProps = Omit<
  IContractSectionModalProps,
  'openTab'
> & {
  workspace?: IWorkspaceDoc;
  onSaved: IOnSavedFunc;
};

export type IContractAddWorkspaceFormFieldsProps = {
  workspacesOptions: IDropdownOption<string>[];
};
