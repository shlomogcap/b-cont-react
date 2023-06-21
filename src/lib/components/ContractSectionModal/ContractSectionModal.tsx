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
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export const ContractSectionModal = ({
  openTab,
  ...rest
}: IContractSectionModalProps) => {
  const { section, workspace } = rest;
  const [activeTab, setActiveTab] = useState(
    openTab ?? EContractSectionItem.Section,
  );
  const { closeModal, showModal } = useModalContext();
  const TABS: Record<EContractSectionItem, ReactElement> = {
    section: (
      <ContractSectionForm
        section={section}
        {...rest}
        onSaved={(section) => {
          !section
            ? showModal({
                name: EModalName.SectionWsForm,
                ...rest,
                section,
              })
            : closeModal();
        }}
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
