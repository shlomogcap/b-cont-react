import { PROJECT_DISPLAY_TEXTS, ProjectMainViews } from '@/lib/consts/projects';
import { Card } from '../../commons/Card';
import { ProjectForm } from '../../ProjectForm/ProjectForm';
import { useRouter } from 'next/router';
import { PROJECT_ID_QUERY } from '@/lib/consts/Routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';

export const ProjectOverviewCard = () => {
  const { query } = useRouter();
  return (
    <Card title={PROJECT_DISPLAY_TEXTS.he.mainViews[ProjectMainViews.Overview]}>
      <ProjectForm id={queryParamToString(query, PROJECT_ID_QUERY)} />
    </Card>
  );
};
