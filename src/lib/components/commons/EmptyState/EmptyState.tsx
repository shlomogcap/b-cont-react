import { StyledEmptyState, StyledEmptyStateRow } from './EmptyState.styled';
import { IEmptyStateProps } from './EmptyState.types';

export const EmptyState = ({
  rows = 3,
  content = '',
  animation = 'none',
}: IEmptyStateProps) => {
  return (
    <StyledEmptyState>
      {content}
      {Array.from({ length: rows }).map((_, i) => (
        <StyledEmptyStateRow
          animation={animation}
          key={i}
          style={{ animationDelay: `${(i + 1) * 0.9 * 1000}ms` }}
        />
      ))}
    </StyledEmptyState>
  );
};
