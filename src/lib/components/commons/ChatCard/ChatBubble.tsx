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

export const ChatBubble = ({
  title,
  createdAt,
  pinned,
  description,
  togglePinned,
  className,
  onItemClick,
}: IChatBubbleProps) => {
  return (
    <StyledChatBubble className={className}>
      {/* TODO: isNewFlag */}
      {/* TODO: userName flag */}
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
