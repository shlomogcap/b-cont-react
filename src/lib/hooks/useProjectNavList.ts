import { useRouter } from 'next/router';
import {
  IProjectDoc,
  PROJECT_DISPLAY_TEXTS,
  EProjectFields,
  EProjectType,
} from '../consts/projects';
import {
  ERoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '../consts/routes';
import { useModalContext } from '../context/ModalProvider/ModalProvider';

type IUseProjectNavListProps = {
  projects: IProjectDoc[];
  projectId: string;
  projectType: EProjectType;
};
export const useProjectNavList = ({
  projects,
  projectId,
  projectType,
}: IUseProjectNavListProps) => {
  const router = useRouter();
  const { closeModal } = useModalContext();
  return projects.map((project) => ({
    id: String(project.id),
    selected: project.id === projectId,
    text: `${PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType]} : ${
      project[EProjectFields.Title]
    }`,
    onClick: () => {
      router.push({
        pathname: ERoutesNames.Project,
        query: {
          [PROJECT_ID_QUERY]: project.id,
          [PROJECT_TYPE_QUERY]: project.projectType,
        },
      });
      closeModal();
    },
  }));
};
