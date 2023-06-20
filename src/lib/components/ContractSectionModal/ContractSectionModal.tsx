import { ReactElement, useState } from 'react';
import { ContractSectionForm } from '../ContractSectionForm';
import { StyledContractSectionModal } from './ContractSectionModal.styled';
import { IContractSectionModalProps } from './ContractSectionModal.types';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractSectionItem,
} from '@/lib/consts/contracts';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { ContractAddWorkspaceForm } from '../ContractAddWorkspaceForm';
import { Tabs } from '../commons/Tabs';

export const ContractSectionModal = ({
  openTab,
  ...rest
}: IContractSectionModalProps) => {
  const { section, workspace } = rest;
  const [activeTab, setActiveTab] = useState(
    openTab ?? EContractSectionItem.Section,
  );
  const { closeModal } = useModalContext();
  const TABS: Record<EContractSectionItem, ReactElement> = {
    section: (
      <ContractSectionForm
        section={section}
        {...rest}
        onSaved={() => closeModal()}
      />
    ),
    workspace: (
      <ContractAddWorkspaceForm
        workspace={workspace}
        {...rest}
        onSaved={() => closeModal()}
      />
    ),
  };
  return (
    <StyledContractSectionModal>
      {!(section || workspace) && (
        <Tabs
          activeTab={activeTab}
          tabs={Object.values(EContractSectionItem).map((item) => ({
            id: item,
            text: CONTRACTS_DISPLAY_TEXTS.he.addNewItems[item],
          }))}
          setActiveTab={setActiveTab}
        />
      )}
      {TABS[activeTab]}
    </StyledContractSectionModal>
  );
};
