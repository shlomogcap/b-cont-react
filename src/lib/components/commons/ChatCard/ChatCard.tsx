import { Card } from '../Card';
import { StyledChatBubbleAdd, StyledChatContainer } from './ChatCard.styled';
import { IChatCardProps } from './ChatCard.types';
import { MOCK_CHATS } from './ChatCard.consts';
import { ChatBubble } from './ChatBubble';

export const ChatCard = ({
  title,
  className,
  addNewText = '+',
  handleAddItem,
}: IChatCardProps) => {
  return (
    <Card title={title} className={className}>
      <StyledChatContainer>
        {MOCK_CHATS.map((item, ind) => (
          <ChatBubble key={ind} {...item} />
        ))}
        {handleAddItem && (
          <StyledChatBubbleAdd onClick={handleAddItem}>
            {addNewText}
          </StyledChatBubbleAdd>
        )}
      </StyledChatContainer>
    </Card>
  );
};
