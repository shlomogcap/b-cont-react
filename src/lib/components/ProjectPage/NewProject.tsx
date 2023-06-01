import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { IRoutesNames } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { PROJECTS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import { Card } from '../commons/Card';
import { ProjectForm } from '../ProjectForm';

export const NewProjectPage = ({ projectType }: IProjectPageProps) => {
  const title = DISPLAY_TEXTS.he.routeNames[IRoutesNames.Project];
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        PROJECTS_BREADCRUMB,
        {
          text: `+ ${title}`,
          id: IRoutesNames.Project,
        },
      ]}
    >
      <Card title={PROJECT_DISPLAY_TEXTS.he.getAddNewText(projectType)}>
        <ProjectForm />
      </Card>
    </PageLayout>
  );
};
