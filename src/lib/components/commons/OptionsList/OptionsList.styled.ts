import styled, { css } from 'styled-components';
import { highlightRowMixin } from '../../styles/mixins/highlightRow';
import { IStyledListItemProps } from './OptionsList.types';

export const StyledOptionsListWrapper = styled.div`
  position: relative;
`;

export const StyledList = styled.div`
  transition: all 0.2s;
  display: grid;
  width: 100%;
  width: fit-content;
  min-width: 20rem;
  border-radius: 1rem;
  background-color: var(--color-white);
  color: var(--color-non-active);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  box-shadow: var(--box-shadow-1);
`;

export const StyledListItem = styled.div<IStyledListItemProps>`
  font: inherit;
  cursor: pointer;
  font-size: 2rem;
  display: grid;
  align-items: center;
  justify-items: flex-start;
  padding: 1rem 2rem;
  grid-auto-flow: column;
  gap: 1rem;
  ${({ isDisabled }) =>
    !isDisabled
      ? css`
          ${highlightRowMixin({ trigger: 'hover', side: 'left' })}
          &:hover {
            background-color: var(--color-bg-2);
          }
        `
      : css`
          cursor: not-allowed;
          color: var(--color-non-active);
        `}
`;
