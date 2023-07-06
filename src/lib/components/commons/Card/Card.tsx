import { StyledCard, StyledCardTitle } from './Card.styled';
import { ICardProps } from './Card.types';

export const Card = ({ title, children, className }: ICardProps) => {
  return (
    <StyledCard className={className}>
      {title && <StyledCardTitle>{title}</StyledCardTitle>}
      {children}
    </StyledCard>
  );
};
