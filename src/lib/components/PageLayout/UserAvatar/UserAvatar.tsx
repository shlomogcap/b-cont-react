import { useUserContext } from '@/lib/context/userContext';
import { StyledUserAvatar } from './UserAvatar.styled';
import { IUserAvatarProps } from './UserAvatar.types';

export const UserAvatar = (props: IUserAvatarProps) => {
  const { data } = useUserContext();
  return (
    <StyledUserAvatar>
      {data?.displayName?.slice(0, 3) ?? data?.email?.slice(0, 3)}
    </StyledUserAvatar>
  );
};
