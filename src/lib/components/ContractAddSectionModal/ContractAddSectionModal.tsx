import { ReactElement, useState } from 'react';
import { Tabs } from '../commons/Tabs';
import { IContractAddSectionModalProps } from './ContractAddSectionModal.types';
import { ContractSectionForm } from '../ContractSectionForm';
import { StyledContractAddSectionModal } from './ContractAddSectionModal.styled';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractSectionItem,
} from '@/lib/consts/contracts';

const TABS: Record<EContractSectionItem, ReactElement> = {
  section: <ContractSectionForm />,
  workspace: <>TODO: add Workspace form</>,
  sectionsGroup: <>TODO: add Section Group form</>,
};

export const ContractAddSectionModal = ({
  openTab = EContractSectionItem.Section,
}: IContractAddSectionModalProps) => {
  const [activeTab, setActiveTab] = useState(openTab);
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
