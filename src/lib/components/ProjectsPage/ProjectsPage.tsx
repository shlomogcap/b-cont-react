import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../consts/displayTexts';
import { Routes } from '../consts/routes';
import { ProjectPageProps } from './ProjectsPage.types';

export const ProjectsPage = ({ projectType }: ProjectPageProps) => {
  return (
    <PageLayout
      title={
        projectType
          ? DISPLAY_TEXTS.he.projectType[projectType]
          : DISPLAY_TEXTS.he.routeNames[Routes.Projects]
      }
    >
      <table>
        <thead>
          <tr>
            <th>פרוייקט</th>
            <th>תאריך התחלה</th>
          </tr>
        </thead>
      </table>
    </PageLayout>
  );
};
