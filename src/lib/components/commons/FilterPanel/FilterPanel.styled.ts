import styled, { css } from 'styled-components';
import { StyledButton } from '../Button';
import { IStyledFilterProps } from './FilterPanel.types';

export const StyledFiltersBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-block: 1rem;
  margin-inline: 0;
`;

export const StyledFilterPanel = styled.div`
  display: grid;
  grid-column: 1/-1;
  gap: 0.5rem;
  position: absolute;
  top: 15%;
  background-color: #ecf0f6;
  z-index: 1;
  border-radius: 10px;
  padding: 2%;
  box-shadow: var(--box-shadow-1);
`;

export const StyledFilterItemCaption = styled.p`
  flex-basis: 100%;
`;

export const StyledFilterControlDiv = styled.div<IStyledFilterProps>`
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  justify-content: ${({ justify }) => justify ?? 'center'};
  margin: 2% 0;
`;

export const StyledFilterButton = styled(StyledButton)<IStyledFilterProps>`
  width: ${({ width }) => width ?? '100%'};

  height: 35px;
  ${({ isButtonGroup }) =>
    isButtonGroup &&
    css`
      border-radius: 0;
      &:last-of-type {
        border-end-end-radius: 0.8rem;
        border-start-end-radius: 0.8rem;
      }
      &:first-of-type {
        border-end-start-radius: 0.8rem;
        border-start-start-radius: 0.8rem;
      }
    `}
  border: ${({ isOptionButton }) =>
    isOptionButton ? '1px solid var(--color-active-light)' : 'none'};
  &:hover {
    box-shadow: none;
    transform: none;
  }
`;
