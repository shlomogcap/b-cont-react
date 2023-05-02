import { PropsWithChildren } from 'react';
import { StyledPageLayout } from './PageLayout.styled';
import { PageLayoutProps } from './PageLayout.types';
import { TopBar } from './TopBar/TopBar';
import { Sidebar } from './Sidebar/Sidebar';

const APP_VERSION = 0.0;
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
      <footer className='footer'>
        <p className='copy'>
          {`${String.fromCharCode(169)} כל הזכויות שמורות לביקונט בע"מ 2020`}
          [version:{APP_VERSION}]
          <span dangerouslySetInnerHTML={{ __html: '&beta' }} />
        </p>
      </footer>
    </StyledPageLayout>
  );
};
