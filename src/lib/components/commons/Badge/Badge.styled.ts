import styled from 'styled-components';

export const StyledBadge = styled.span`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 12px;
  background-color: var(--color-active);
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`;

export const StyledColumnBadge = styled(StyledBadge)`
  width: 0.5rem;
  height: 0.5rem;
  top: 0;
  right: 0;
`;
