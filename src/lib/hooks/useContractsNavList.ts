import { useRouter } from 'next/router';
import {
  CONTRACT_ID_QUERY,
  ERoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '../consts/routes';
import { useModalContext } from '../context/ModalProvider/ModalProvider';
import { EContractFields, IContractDoc } from '../consts/contracts';

type IUseContractsNavListProps = {
  contracts: IContractDoc[];
  projectId: string;
  projectType: string;
  contractId: string;
};
export const useContractsNavList = ({
  projectId,
  projectType,
  contracts,
  contractId,
}: IUseContractsNavListProps) => {
  const router = useRouter();
  const { closeModal } = useModalContext();
  return contracts.map((contract) => ({
    id: String(contract.id),
    selected: contract.id === contractId,
    text: contract[EContractFields.Title],
    onClick: () => {
      router.push({
        pathname: ERoutesNames.Contract,
        query: {
          [PROJECT_ID_QUERY]: projectId,
          [PROJECT_TYPE_QUERY]: projectType,
          [CONTRACT_ID_QUERY]: contract.id,
        },
      });
      closeModal();
    },
  }));
};
