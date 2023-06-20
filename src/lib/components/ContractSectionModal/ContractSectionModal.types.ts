import { EContractSectionItem, IContractDoc } from '@/lib/consts/contracts';
import { ISectionDoc } from '@/lib/consts/sections';
import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IContractSectionModalProps = {
  openTab?: EContractSectionItem;
  section?: ISectionDoc;
  workspace?: IWorkspaceDoc;
  contract: IContractDoc;
  workspaces: IWorkspaceDoc[];
};
export type IContractSectionModalData = IContractSectionModalProps & {
  name: EModalName.SectionWsForm;
};
