import { useRouter } from 'next/router';
import {
  IProjectDoc,
  PROJECT_DISPLAY_TEXTS,
  ProjectFields,
  ProjectType,
} from '../consts/projects';
import {
  IRoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '../consts/routes';
import { useModalContext } from '../context/ModalProvider/ModalProvider';

type IUseProjectNavListProps = {
  projects: IProjectDoc[];
  projectId: string;
  projectType: ProjectType;
};
export const useProjectNavList = ({
  projects,
  projectId,
  projectType,
}: IUseProjectNavListProps) => {
  const router = useRouter();
  const { closeModal } = useModalContext();
  return projects
    .filter(({ id }) => id !== projectId)
    .map((project) => ({
      id: String(project.id),
      text: `${PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType]} : ${
        project[ProjectFields.Title]
      }`,
      onClick: () => {
        router.push({
          pathname: IRoutesNames.Project,
          query: {
            [PROJECT_ID_QUERY]: project.id,
            [PROJECT_TYPE_QUERY]: project.projectType,
          },
        });
        closeModal();
      },
    }));
};
