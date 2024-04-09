import { PropsWithChildren } from 'react';
import { IFullPageLayoutProps } from './FullPageLayout.types';
import {
  StyledArrowIcon,
  StyledFullPageLayout,
  StyledFullPageLayoutTopBar,
} from './FullPageLayout.styled';
import { Breadcrumbs } from '../Breadcrubms/Breadcrumbs';
import { Tooltip } from '../../commons/Tooltip';

export const FullPageLayout = ({
  className = '',
  breadcrubms,
  children,
  backTooltipContent = 'Back To Page',
  onBackClick,
}: PropsWithChildren<IFullPageLayoutProps>) => {
  return (
    <StyledFullPageLayout className={className}>
      <StyledFullPageLayoutTopBar>
        <Tooltip content={backTooltipContent}>
          <StyledArrowIcon direction='right' onClick={onBackClick} size='L' />
        </Tooltip>
        {breadcrubms && <Breadcrumbs breadcrumbs={breadcrubms} />}
      </StyledFullPageLayoutTopBar>
      <main className='content'>{children}</main>
    </StyledFullPageLayout>
  );
};
