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
  EContractFields,
  EContractSectionItem,
  EContractStatus,
} from '@/lib/consts/contracts';
import { ButtonMenu } from '@/lib/components/commons/Button/ButtonMenu';
import { TriangleArrowIcon } from '@/lib/components/icons/TriangleArrowIcon';
import { DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import { ISectionDoc } from '@/lib/consts/sections';
import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { ECommonFields } from '@/lib/consts/commonFields';

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
    workspaces,
  };
  const isPlanContract =
    contract?.[EContractFields.Status] === EContractStatus.Plan;
  const handleChangeToActive = async () => {
    const docRef = doc(firestore, contract?.[ECommonFields.Path]!);
    await updateDoc(docRef, {
      [EContractFields.Status]: EContractStatus.Active,
    });
  };
  return (
    <>
      <ReportTable
        title={
          <StyledActionsRow>
            <Button
              onClick={() =>
                showModal({
                  name: EModalName.SectionWsForm,
                  openTab: EContractSectionItem.Section,
                  ...modalProps,
                })
              }
              disabled={!isPlanContract}
            >
              {DISPLAY_TEXTS.he.buttons[EButtonTexts.Add]}
            </Button>
            <ButtonMenu
              options={Object.entries(
                CONTRACTS_DISPLAY_TEXTS.he.addNewItems,
              ).map(([key, text]) => ({
                text,
                value: key,
                disabled: !isPlanContract,
                onOptionClick: () =>
                  showModal({
                    name: EModalName.SectionWsForm,
                    openTab: key as any,
                    ...modalProps,
                  }),
              }))}
            >
              <TriangleArrowIcon direction='down' />
            </ButtonMenu>
          </StyledActionsRow>
        }
        onRowClick={(section) => {
          showModal({
            name: EModalName.SectionWsForm,
            section: section as ISectionDoc,
            ...modalProps,
          });
        }}
        onSectionClick={(workspace) => {
          showModal({
            name: EModalName.SectionWsForm,
            openTab: EContractSectionItem.Workspace,
            workspace: workspace as IWorkspaceDoc,
            ...modalProps,
          });
        }}
        columns={CONTRACT_SECTIONS_COLUMNS}
        sections={reportSections}
      />
      <StyledActionsRow>
        {isPlanContract && (
          <Button onClick={handleChangeToActive}>Go To Actulas View</Button>
        )}
      </StyledActionsRow>
    </>
  );
};
