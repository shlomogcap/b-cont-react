import { useUserContext } from '@/lib/context/userContext';
import { StyledUserAvatar } from './UserAvatar.styled';
import { IUserAvatarProps } from './UserAvatar.types';

export const UserAvatar = ({ onClick }: IUserAvatarProps) => {
  const { data } = useUserContext();
  const getDisplayAvatar = () => {
    if (data?.displayName) {
      if (data.displayName.split(' ').length > 0) {
        return data.displayName
          .split(' ')
          .reduce((acc, curr) => acc + curr.substring(0, 1), '');
      }
      return data?.displayName?.slice(0, 3);
    }
    return data?.email?.slice(0, 3);
  };
  return (
    <StyledUserAvatar onClick={onClick}>{getDisplayAvatar()}</StyledUserAvatar>
  );
};
