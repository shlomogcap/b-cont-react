import { Button } from '../commons/Button';
import { StyledAddItemButton } from './AddItem.styled';
import { IAddItemProps } from './AddItem.types';

export const AddItem = ({ addItem }: IAddItemProps) => {
  const { text, func } = addItem;
  return (
    <StyledAddItemButton onClick={() => func()}>{text}</StyledAddItemButton>
  );
};
