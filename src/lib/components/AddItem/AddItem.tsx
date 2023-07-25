import { Button } from '../commons/Button';
import { IAddItemProps } from './AddItem.types';

export const AddItem = ({ addItem }: IAddItemProps) => {
  const { text, func } = addItem;
  return <Button onClick={() => func()}>{text}</Button>;
};
