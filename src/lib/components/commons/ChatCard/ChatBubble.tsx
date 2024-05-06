import { useUsersContext } from '@/lib/context/usersContext';
import {
  StyledChatBubble,
  StyledChatBubbleContent,
  StyledChatBubbleInfo,
  StyledChatBubbleStage,
  StyledChatBubbleTitle,
  StyledPinIcon,
} from './ChatCard.styled';
import { IChatBubbleProps } from './ChatCard.types';
import { datetimeDueFormat } from '@/lib/utils/datatimeDueFormat';
import { Flag } from '../../Flag';

export const ChatBubble = ({
  title,
  createdAt,
  createdBy,
  pinned,
  description,
  togglePinned,
  className,
  onItemClick,
}: IChatBubbleProps) => {
  const { data: users } = useUsersContext();
  console.log(users, createdBy);

  return (
    <StyledChatBubble className={className}>
      {/* TODO: isNewFlag */}
      {/* TODO: userName flag */}
      <Flag>
        {users.find((user) => user.id === createdBy)?.email ??
          '--UNKNOWN USER--'}
      </Flag>
      <StyledChatBubbleTitle>
        <span onClick={onItemClick}>{title}</span>
        <StyledPinIcon
          pinned={Boolean(pinned)}
          onClick={() => togglePinned?.()}
        />
      </StyledChatBubbleTitle>
      <StyledChatBubbleContent>{description}</StyledChatBubbleContent>
      <StyledChatBubbleStage>2020-01</StyledChatBubbleStage>
      <StyledChatBubbleInfo>
        {datetimeDueFormat(createdAt, { useHours: true })}
      </StyledChatBubbleInfo>
    </StyledChatBubble>
  );
};
