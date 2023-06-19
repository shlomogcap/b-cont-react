import { EContractSectionItem, IContractDoc } from '@/lib/consts/contracts';
import { ISectionDoc } from '@/lib/consts/sections';
import { IGroupDoc, IWorkspaceDoc } from '@/lib/consts/workspaces';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IContractAddSectionModalProps = {
  openTab?: EContractSectionItem;
  contract: IContractDoc;
  section?: ISectionDoc;
  workspaces: IWorkspaceDoc[];
  groups: IGroupDoc[];
};

export type IContractAddSectionFormModalData = IContractAddSectionModalProps & {
  name: EModalName.AddSectionForm;
};
