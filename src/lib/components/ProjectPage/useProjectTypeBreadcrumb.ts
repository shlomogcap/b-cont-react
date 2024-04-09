import { PROJECT_DISPLAY_TEXTS, EProjectType } from '@/lib/consts/projects';
import { IBreadcrumbProps } from '../PageLayout/Breadcrubms';
import { useRouter } from 'next/router';
import { PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';

export const useProjectTypeBreadcrumb = (
  projectType: EProjectType,
  pathname?: string,
): IBreadcrumbProps => {
  const { closeModal } = useModalContext();
  const router = useRouter();
  return {
    text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType],
    id: 'projectType',
    navList: [
      EProjectType.Residential,
      EProjectType.Entrepreneurship,
      EProjectType.PublicSpace,
    ].map((type) => ({
      id: type,
      selected: projectType === type,
      text: PROJECT_DISPLAY_TEXTS.he.projectTypes[type],
      onClick: () => {
        router.push({
          pathname: pathname ?? router.pathname,
          query: { [PROJECT_TYPE_QUERY]: type },
        });
        closeModal();
      },
    })),
  };
};
