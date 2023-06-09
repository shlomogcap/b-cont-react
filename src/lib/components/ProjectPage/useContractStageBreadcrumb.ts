import { IBreadcrumbProps } from '../PageLayout/Breadcrubms';
import { useRouter } from 'next/router';
import { CONTRACT_STAGE_QUERY, PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { CONTRACTS_DISPLAY_TEXTS } from '@/lib/consts/contracts';
import { EContractStage } from '@/lib/consts/contracts/ContractStage';

export const useContractStageBreadcrumb = (
  currentStage: EContractStage,
): IBreadcrumbProps => {
  const { closeModal } = useModalContext();
  const router = useRouter();
  return {
    text: CONTRACTS_DISPLAY_TEXTS.he.contractStage[currentStage],
    id: 'contract-stage',
    navList: [
      EContractStage.Plan,
      EContractStage.Actual,
      EContractStage.Billing,
    ]
      .filter((stage) => stage !== currentStage)
      .map((stage) => ({
        id: stage,
        text: CONTRACTS_DISPLAY_TEXTS.he.contractStage[stage],
        onClick: () => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, [CONTRACT_STAGE_QUERY]: stage },
          });
          closeModal();
        },
      })),
  };
};
