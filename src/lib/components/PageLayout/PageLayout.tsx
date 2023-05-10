import { PropsWithChildren } from 'react';
import { StyledPageLayout } from './PageLayout.styled';
import { IPageLayoutProps } from './PageLayout.types';
import { TopBar } from './TopBar/TopBar';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';

export const PageLayout = ({
  title,
  className = '',
  breadcrubms,
  children,
}: PropsWithChildren<IPageLayoutProps>) => {
  return (
    <StyledPageLayout className={className}>
      <TopBar
        title={title}
        breadcrumbs={
          breadcrubms ?? [
            {
              text: DISPLAY_TEXTS.he.routeNames[Routes.Projects],
              href: Routes.Projects,
              id: Routes.Projects,
            },
          ]
        }
      />
      <div className='page'>
        <Sidebar title='' />
        <main className='content'>{children}</main>
      </div>
      <Footer />
    </StyledPageLayout>
  );
};
