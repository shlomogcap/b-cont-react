import {
  StyledChatBubble,
  StyledChatBubbleContent,
  StyledChatBubbleInfo,
  StyledChatBubbleStage,
  StyledChatBubbleTitle,
  StyledPinIcon,
} from './ChatCard.styled';
import { IChatBubblProps } from './ChatCard.types';
import { datetimeDueFormat } from '@/lib/utils/datatimeDueFormat';

export const ChatBubble = ({
  title,
  createdAt,
  pinned,
  description,
  togglePinned,
  className,
}: IChatBubblProps) => {
  return (
    <StyledChatBubble className={className}>
      {/* TODO: isNewFlag */}
      {/* TODO: userName flag */}
      <StyledChatBubbleTitle>
        {title}
        <StyledPinIcon pinned={Boolean(pinned)} onClick={togglePinned} />
      </StyledChatBubbleTitle>
      <StyledChatBubbleContent>{description}</StyledChatBubbleContent>
      <StyledChatBubbleStage>2020-01</StyledChatBubbleStage>
      <StyledChatBubbleInfo>
        {datetimeDueFormat(createdAt, { useHours: true })}
      </StyledChatBubbleInfo>
    </StyledChatBubble>
  );
};
