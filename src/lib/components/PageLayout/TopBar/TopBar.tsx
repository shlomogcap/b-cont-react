import { Breadcrumbs } from '../Breadcrubms/Breadcrumbs';
import { StyledLogo, StyledTopBar } from './TopBar.styled';
import { TopBarProps } from './TopBar.types';

export const TopBar = ({ title, breadcrumbs }: TopBarProps) => {
  return (
    <StyledTopBar>
      <StyledLogo />
      <div className='title'>
        <span className='title-text'>{title}</span>
      </div>
      <div className='user-box'>SG</div>
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
    </StyledTopBar>
  );
};
