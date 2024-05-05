import styled, { css } from 'styled-components';
import { activateButtonMixin } from '../../styles/mixins/activateButton';
import { PinIcon } from '../../icons/PinIcon';

export const StyledChatContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

export const StyledChatBubbleContent = styled.div`
  grid-area: c;
  visibility: hidden;
  opacity: 0;
  height: 0;
  transition: all 0.2s ease-in;
  white-space: break-spaces;
`;

export const StyledChatBubbleInfo = styled.div`
  grid-area: i;
  justify-self: flex-end;
  padding: 1rem;
  font-size: 1.2rem;
  color: lightslategray;
`;
export const StyledChatBubbleStage = styled.div`
  grid-area: stage;
  padding: 1rem;
  font-size: 1.2rem;
  color: lightslategray;
`;

export const StyledPinIcon = styled(PinIcon)<{ pinned: boolean }>`
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
  ${({ pinned }) =>
    pinned
      ? css`
          color: var(--color-active);
          stroke: var(--color-active);
        `
      : css`
          color: transparent;
          stroke: var(--color-non-active);
        `}
`;

export const StyledChatBubble = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-areas:
    't t t action'
    'c c c c'
    'c c c c'
    'stage stage i i';
  background-color: #e2e6ad52;
  padding: 0;
  border-radius: 1.5rem;
  align-items: center;
  &:hover ${StyledChatBubbleContent} {
    visibility: visible;
    opacity: 1;
    height: auto;
  }
`;

export const StyledChatBubbleAdd = styled(StyledChatBubble)`
  grid-template-areas: none;
  align-items: center;
  justify-content: center;
  color: var(--color-active-light);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${activateButtonMixin}
`;

export const StyledChatBubbleTitle = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
  color: var(--color-active);
  font-weight: 500;
  white-space: break-spaces;
  grid-area: t;
  justify-self: start;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
