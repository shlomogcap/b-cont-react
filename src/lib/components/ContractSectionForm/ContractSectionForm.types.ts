import { ISectionDoc } from '@/lib/consts/sections';
import { IContractSectionModalProps } from '../ContractSectionModal';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';
import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { z } from 'zod';
import { SectionFormShape } from './ContractSectionForm.consts';

type IOnSavedFuncArgs = Partial<ISectionDoc>;
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

//TODO: move to global context - as well as creat this function globally
export type IHandleSwapOrderIndexFuncArgs = {
  originalDoc: {
    id: string;
    orderIndex: number;
  };
  otherDoc: {
    id: string;
    orderIndex: number;
  };
};
export type IHandleSwapOrderIndexFunc = (
  args: IHandleSwapOrderIndexFuncArgs,
) => void;

export type IMilestonesTableProps = {
  isLoading: boolean;
  isPreviewMode: boolean;
  handleDeleteMilestone: (id: string) => void;
  handleSwapMilestonesOrderIndex: IHandleSwapOrderIndexFunc;
};

export type ISectionFormValues = z.infer<typeof SectionFormShape>;
