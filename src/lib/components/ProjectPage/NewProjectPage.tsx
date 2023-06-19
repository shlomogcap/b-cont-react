import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { IRoutesNames, PROJECT_TYPE_QUERY } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { APP_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { PROJECT_DISPLAY_TEXTS, ProjectType } from '@/lib/consts/projects';
import { Card } from '../commons/Card';
import { ProjectForm } from '../ProjectForm';
import { useRouter } from 'next/router';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { IBreadcrumbProps } from '../PageLayout/Breadcrubms';

export const NewProjectPage = ({ projectType }: IProjectPageProps) => {
  const title = DISPLAY_TEXTS.he.routeNames[IRoutesNames.Project];
  const router = useRouter();
  const { closeModal } = useModalContext();
  const addProjectText = PROJECT_DISPLAY_TEXTS.he.getAddNewText(projectType);
  const projectsTypeBreadCrumb: IBreadcrumbProps = {
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
            pathname: router.pathname,
            query: { [PROJECT_TYPE_QUERY]: projectType },
          });
          closeModal();
        },
      })),
  };
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        APP_BREADCRUMB,
        projectsTypeBreadCrumb,
        {
          text: addProjectText,
          id: IRoutesNames.Project,
        },
      ]}
    >
      <Card title={addProjectText}>
        <ProjectForm />
      </Card>
    </PageLayout>
  );
};
