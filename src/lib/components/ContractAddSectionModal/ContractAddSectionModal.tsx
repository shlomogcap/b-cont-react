import { ReactElement, useState } from 'react';
import { Tabs } from '../commons/Tabs';
import { IContractAddSectionModalProps } from './ContractAddSectionModal.types';
import { ContractSectionForm } from '../ContractSectionForm';
import { StyledContractAddSectionModal } from './ContractAddSectionModal.styled';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractSectionItem,
} from '@/lib/consts/contracts';

export const ContractAddSectionModal = ({
  openTab = EContractSectionItem.Section,
  ...rest
}: IContractAddSectionModalProps) => {
  const [activeTab, setActiveTab] = useState(openTab);
  const TABS: Record<EContractSectionItem, ReactElement> = {
    section: <ContractSectionForm {...rest} />,
    workspace: <>TODO: add Workspace form</>,
    sectionsGroup: <>TODO: add Section Group form</>,
  };
  return (
    <StyledContractAddSectionModal>
      <Tabs
        activeTab={activeTab}
        tabs={Object.values(EContractSectionItem).map((item) => ({
          id: item,
          text: CONTRACTS_DISPLAY_TEXTS.he.addNewItems[item],
        }))}
        setActiveTab={setActiveTab}
      />
      {TABS[activeTab]}
    </StyledContractAddSectionModal>
  );
};
