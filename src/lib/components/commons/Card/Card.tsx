import { StyledCard, StyledCardTitle } from './Card.styled';
import { ICardProps } from './Card.types';

export const Card = ({ title }: ICardProps) => {
  return (
    <StyledCard>
      {title && <StyledCardTitle>{title}</StyledCardTitle>}
    </StyledCard>
  );
};
