import { Breadcrumbs } from '../Breadcrubms/Breadcrumbs';
import { UserAvatar } from '../UserAvatar';
import { StyledLogo, StyledTopBar } from './TopBar.styled';
import { ITopBarProps } from './TopBar.types';

export const TopBar = ({ title, breadcrumbs }: ITopBarProps) => {
  return (
    <StyledTopBar>
      <StyledLogo />
      <div className='title'>
        <span className='title-text'>{title}</span>
      </div>
      <UserAvatar />
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
    </StyledTopBar>
  );
};
