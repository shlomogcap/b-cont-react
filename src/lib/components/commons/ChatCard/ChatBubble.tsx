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
import { getDisplaydUser } from './ChatCard.utils';

export const ChatBubble = ({
  title,
  createdAt,
  createdBy,
  pinned,
  description,
  togglePinned,
  className,
  onItemClick,
  source = '---',
}: IChatBubbleProps) => {
  const { data: users } = useUsersContext();
  return (
    <StyledChatBubble className={className}>
      <Flag>{getDisplaydUser(users, createdBy)}</Flag>
      <StyledChatBubbleTitle>
        <span onClick={onItemClick}>{title}</span>
        <StyledPinIcon
          pinned={Boolean(pinned)}
          onClick={() => togglePinned?.()}
        />
      </StyledChatBubbleTitle>
      <StyledChatBubbleContent>{description}</StyledChatBubbleContent>
      <StyledChatBubbleStage>{source}</StyledChatBubbleStage>
      <StyledChatBubbleInfo>
        {datetimeDueFormat(createdAt, { useHours: true })}
      </StyledChatBubbleInfo>
    </StyledChatBubble>
  );
};
