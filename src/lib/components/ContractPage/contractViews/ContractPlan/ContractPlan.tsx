import { ReportTable } from '@/lib/components/ReportTable';
import { IContractPlanProps } from './ContractPlan.types';
import { CONTRACT_SECTIONS_COLUMNS } from './ContractPlan.consts';
import { useContractContext } from '@/lib/context/contractContext';
import { prepareContractSectionReport } from './ContractPlan.utils';

export const ContractPlan = (props: IContractPlanProps) => {
  const {
    data: { sections: contractSections },
  } = useContractContext();
  const reportSections = prepareContractSectionReport(contractSections);
  return (
    <>
      <ReportTable
        columns={CONTRACT_SECTIONS_COLUMNS}
        sections={reportSections}
      />
    </>
  );
};
