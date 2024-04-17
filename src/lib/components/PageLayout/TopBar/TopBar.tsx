import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { Breadcrumbs } from '../Breadcrubms/Breadcrumbs';
import { UserAvatar } from '../UserAvatar';
import { StyledLogo, StyledTopBar } from './TopBar.styled';
import { ITopBarProps } from './TopBar.types';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';

export const TopBar = ({ title, breadcrumbs }: ITopBarProps) => {
  const { showModal } = useModalContext();
  return (
    <StyledTopBar>
      <StyledLogo />
      <div className='title'>
        <span className='title-text'>{title}</span>
      </div>
      <UserAvatar
        onClick={() => showModal({ name: EModalName.EditUserForm })}
      />
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
    </StyledTopBar>
  );
};
