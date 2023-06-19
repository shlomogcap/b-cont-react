import { ReportTable } from '@/lib/components/ReportTable';
import { IContractPlanProps } from './ContractPlan.types';
import { CONTRACT_SECTIONS_COLUMNS } from './ContractPlan.consts';
import { useContractContext } from '@/lib/context/contractContext';
import { prepareContractSectionReport } from './ContractPlan.utils';
import { Button } from '@/lib/components/commons/Button';
import { StyledActionsRow } from './ContractPlan.styled';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractSectionItem,
} from '@/lib/consts/contracts';
import { ButtonMenu } from '@/lib/components/commons/Button/ButtonMenu';
import { TriangleArrowIcon } from '@/lib/components/icons/TriangleArrowIcon';
import { DISPLAY_TEXTS, IButtonTexts } from '@/lib/consts/displayTexts';
import {
  EWorkspaceEntityType,
  IGroupDoc,
  IWorkspaceDoc,
} from '@/lib/consts/workspaces';

export const ContractPlan = (props: IContractPlanProps) => {
  const { showModal } = useModalContext();
  const {
    data: { contract, sections: contractSections, workspaces },
  } = useContractContext();
  const reportSections = prepareContractSectionReport(
    contractSections,
    workspaces,
  );
  const modalProps = {
    contract: contract!,
    groups: workspaces.filter(
      ({ entityType }) => entityType === EWorkspaceEntityType.Group,
    ) as IGroupDoc[],
    workspaces: workspaces.filter(
      ({ entityType }) => entityType === EWorkspaceEntityType.Workspace,
    ) as IWorkspaceDoc[],
  };
  return (
    <>
      <ReportTable
        title={
          <StyledActionsRow>
            <Button
              onClick={() =>
                showModal({
                  name: EModalName.AddSectionForm,
                  openTab: EContractSectionItem.Section,
                  ...modalProps,
                })
              }
            >
              {DISPLAY_TEXTS.he.buttons[IButtonTexts.Add]}
            </Button>
            <ButtonMenu
              options={Object.entries(
                CONTRACTS_DISPLAY_TEXTS.he.addNewItems,
              ).map(([key, text]) => ({
                text,
                value: key,
                onOptionClick: () =>
                  showModal({
                    name: EModalName.AddSectionForm,
                    openTab: key as any,
                    ...modalProps,
                  }),
              }))}
            >
              <TriangleArrowIcon direction='down' />
            </ButtonMenu>
          </StyledActionsRow>
        }
        columns={CONTRACT_SECTIONS_COLUMNS}
        sections={reportSections}
      />
    </>
  );
};
