import { PROJECT_DISPLAY_TEXTS, ProjectType } from '@/lib/consts/projects';
import { IBreadcrumbProps } from '../PageLayout/Breadcrubms';
import { useRouter } from 'next/router';
import { IRoutesNames, PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';

export const useProjectTypeBreadcrumb = (
  projectType: ProjectType,
  pathname?: string,
): IBreadcrumbProps => {
  const { closeModal } = useModalContext();
  const router = useRouter();
  return {
    text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType],
    id: 'projectType',
    navList: [
      ProjectType.Residential,
      ProjectType.Entrepreneurship,
      ProjectType.PublicSpace,
    ]
      .filter((type) => type !== projectType)
      .map((projectType) => ({
        id: projectType,
        text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType],
        onClick: () => {
          router.push({
            pathname: pathname ?? router.pathname,
            query: { [PROJECT_TYPE_QUERY]: projectType },
          });
          closeModal();
        },
      })),
  };
};
