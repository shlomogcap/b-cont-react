import { StyledAddItemButton } from './AddItem.styled';
import { IAddItemProps } from './AddItem.types';

export const AddItem = ({ addItem }: IAddItemProps) => {
  const { text, handleAddItem } = addItem;
  return (
    <StyledAddItemButton onClick={handleAddItem}>{text}</StyledAddItemButton>
  );
};
