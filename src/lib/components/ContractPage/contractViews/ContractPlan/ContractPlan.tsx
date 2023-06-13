import { ReportTable } from '@/lib/components/ReportTable';
import { IContractPlanProps } from './ContractPlan.types';
import { CONTRACT_SECTIONS_COLUMNS } from './ContractPlan.consts';
import { useContractContext } from '@/lib/context/contractContext';
import { prepareContractSectionReport } from './ContractPlan.utils';
import { Button } from '@/lib/components/commons/Button';
import { StyledActionsRow } from './ContractPlan.styled';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { CONTRACTS_DISPLAY_TEXTS } from '@/lib/consts/contracts';
import { ButtonMenu } from '@/lib/components/commons/Button/ButtonMenu';
import { TriangleArrowIcon } from '@/lib/components/icons/TriangleArrowIcon';

export const ContractPlan = (props: IContractPlanProps) => {
  const { showModal } = useModalContext();
  const {
    data: { sections: contractSections },
  } = useContractContext();
  const reportSections = prepareContractSectionReport(contractSections);
  return (
    <>
      <ReportTable
        title={
          <StyledActionsRow>
            <Button onClick={() => showModal({ name: EModalName.SectionForm })}>
              {CONTRACTS_DISPLAY_TEXTS.he.addNewItems.section}
            </Button>
            <ButtonMenu
              options={Object.entries(
                CONTRACTS_DISPLAY_TEXTS.he.addNewItems,
              ).map(([key, text]) => ({
                text,
                value: key,
                onOptionClick: () =>
                  showModal({
                    name: EModalName.SectionForm,
                    openTab: key as any,
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
