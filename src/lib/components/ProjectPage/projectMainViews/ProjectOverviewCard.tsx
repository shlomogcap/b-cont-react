import { PROJECT_DISPLAY_TEXTS, ProjectMainViews } from '@/lib/consts/projects';
import { Card } from '../../commons/Card';
import { ProjectForm } from './ProjectForm';

export const ProjectOverviewCard = () => {
  return (
    <Card title={PROJECT_DISPLAY_TEXTS.he.mainViews[ProjectMainViews.Overview]}>
      <ProjectForm />
    </Card>
  );
};
