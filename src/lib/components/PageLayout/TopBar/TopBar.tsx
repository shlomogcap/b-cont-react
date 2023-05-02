import { Breadcrumbs } from '../Breadcrubms/Breadcrumbs';
import { Logo } from '../Logo/Logo';
import { StyledTopBar } from './TopBar.styled';
import { TopBarProps } from './TopBar.types';

export const TopBar = ({ title }: TopBarProps) => {
  return (
    <StyledTopBar>
      <Logo />
      <div className='title'>{title}</div>
      <div className='user-box'>SG</div>
      <Breadcrumbs />
    </StyledTopBar>
  );
};
