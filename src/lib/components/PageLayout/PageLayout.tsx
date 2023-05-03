import { PropsWithChildren } from 'react';
import { StyledPageLayout } from './PageLayout.styled';
import { PageLayoutProps } from './PageLayout.types';
import { TopBar } from './TopBar/TopBar';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';

export const PageLayout = ({
  title,
  className = '',
  children,
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <StyledPageLayout className={className}>
      <TopBar title={title} />
      <div className='page'>
        <Sidebar title='' />
        <main className='content'>{children}</main>
      </div>
      <Footer />
    </StyledPageLayout>
  );
};
