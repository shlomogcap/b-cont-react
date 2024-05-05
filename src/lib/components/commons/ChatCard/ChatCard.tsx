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
  handleItemClicked,
  handleTogglePinned,
  items = MOCK_CHATS,
}: IChatCardProps) => {
  return (
    <Card title={title} className={className}>
      <StyledChatContainer>
        {items.map((item, ind) => (
          <ChatBubble
            key={ind}
            {...item}
            onItemClick={() => handleItemClicked?.(item)}
            togglePinned={() =>
              handleTogglePinned?.({ path: item.path!, pinned: item.pinned! })
            }
          />
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
