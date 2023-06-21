import { ISectionDoc } from '@/lib/consts/sections';
import { IContractSectionModalProps } from '../ContractSectionModal';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';
import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { IMilestoneDoc } from '@/lib/consts/milestones';
import { z } from 'zod';
import { SectionFormShape } from './ContractSectionForm.consts';

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
export type IMilestonesTableProps = {
  milestones: IMilestoneDoc[];
  isLoading: boolean;
};

export type ISectionFormValues = z.infer<typeof SectionFormShape>;
