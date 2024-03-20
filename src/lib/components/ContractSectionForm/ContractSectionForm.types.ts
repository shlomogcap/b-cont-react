import { ESectionFields, ISectionDoc } from '@/lib/consts/sections';
import { IContractSectionModalProps } from '../ContractSectionModal';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';
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

export type IContractFormFieldsNames = { [key in ESectionFields]?: string };

export type IContractSectionFormFieldsProps = {
  workspacesOptions: IDropdownOption<string>[];
  readOnly?: boolean;
  fieldsNames?: IContractFormFieldsNames;
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
