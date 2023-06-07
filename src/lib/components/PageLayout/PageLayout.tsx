import { PropsWithChildren } from 'react';
import { StyledPageLayout } from './PageLayout.styled';
import { IPageLayoutProps } from './PageLayout.types';
import { TopBar } from './TopBar/TopBar';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { APP_BREADCRUMB } from '@/lib/consts/breadcrumbs';

export const PageLayout = ({
  title,
  className = '',
  breadcrubms,
  children,
}: PropsWithChildren<IPageLayoutProps>) => {
  return (
    <StyledPageLayout className={className}>
      <TopBar title={title} breadcrumbs={breadcrubms ?? [APP_BREADCRUMB]} />
      <div className='page'>
        <Sidebar title='' />
        <main className='content'>{children}</main>
      </div>
      <Footer />
    </StyledPageLayout>
  );
};
