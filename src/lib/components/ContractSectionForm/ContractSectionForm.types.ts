import { ISectionDoc } from '@/lib/consts/sections';
import { IContractSectionModalProps } from '../ContractSectionModal';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';
import { IWorkspaceDoc } from '@/lib/consts/workspaces';

type IOnSavedFuncArgs = Partial<ISectionDoc | IWorkspaceDoc>;
type IOnSavedFunc = (args?: IOnSavedFuncArgs) => void;

export type IContractSectionFormProps = Omit<
  IContractSectionModalProps,
  'openTab' | 'workspace'
> & {
  onSaved?: IOnSavedFunc;
};

export type IContractSectionFormFieldsProps = {
  workspacesOptions: IDropdownOption<string>[];
};
