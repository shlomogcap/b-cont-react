import styled from 'styled-components';

export const StyledTooltip = styled.div`
  cursor: context-menu;
  white-space: pre-line;
  z-index: 9999;
  user-select: text;
  border-radius: 1rem;
  background-color: var(--color-active-dark);
  color: white;
  padding: 1rem;
  & .content {
    font-size: var(--font-size-small);
    text-align: center;
    color: inherit;
  }
  & .arrow {
    position: absolute;
    content: '';
    bottom: -1rem;
    width: 0;
    height: 0;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: none;
    border-top: 1rem solid var(--color-active-dark);
  }
`;
