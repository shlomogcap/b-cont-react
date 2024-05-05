import { Card } from '../Card';
import { StyledChatBubbleAdd, StyledChatContainer } from './ChatCard.styled';
import { IChatCardProps, IChatItem } from './ChatCard.types';
import { ChatBubble } from './ChatBubble';

export const ChatCard = <T extends IChatItem>({
  title,
  className,
  addNewText = '+',
  handleAddItem,
  handleItemClicked,
  handleTogglePinned,
  items,
}: IChatCardProps<T>) => {
  return (
    <Card title={title} className={className}>
      <StyledChatContainer>
        {items.map((item, ind) => (
          <ChatBubble
            key={ind}
            {...item}
            onItemClick={() => handleItemClicked?.(item)}
            togglePinned={() =>
              handleTogglePinned?.({ path: item.path, pinned: item.pinned })
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
