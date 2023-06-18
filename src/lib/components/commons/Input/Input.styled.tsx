import styled, { css } from 'styled-components';
import { StyledDropdownField } from './inputs/DropdownInput/DropdownInput.styled';

type TStyledInputControlProps = {
  isTextOnly?: boolean;
  hasError?: boolean;
};

export const StyledInputLabel = styled.label`
  color: var(--color-gray-1);
  font-size: 1.9rem;
  font-weight: var(--font-w-2);
  transition: all 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputStyles = css`
  font: inherit;
  font-size: 1.8rem;
  padding: 1.2rem;
  font-weight: var(--font-w-2);
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
  text-overflow: ellipsis;
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 5.5rem;

  &:read-only {
    cursor: context-menu;
    color: var(--color-gray);
  }

  &[data-id] {
    cursor: pointer;
    text-decoration: underline;
    color: var(--color-active);
    transition: all 0.3s;
  }

  &:disabled {
    cursor: context-menu;
    background: none;
    border-bottom: 0.5px solid var(--color-gray-3);
  }
`;

export const StyledInputField = styled.input`
  ${InputStyles}
`;

export const StyledInputControl = styled.div<IStyledInputControlProps>`
  display: grid;
  &:focus-within ${StyledInputLabel} {
    color: var(--color-active-1);
    font-weight: var(--font-w-3);
  }
  &:focus-within ${StyledInputField} {
    border-bottom: 0.5px solid var(--color-active-1);
    background-color: var(--color-bg-2);
  }
  ${({ isTextOnly }) =>
    isTextOnly &&
    css`
      & ${StyledInputField} {
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: text;
        cursor: context-menu;
        background: none;
        border-bottom: 0.5px solid var(--color-gray-3);
      }
    `}

  ${({ hasError }) =>
    hasError &&
    css`
      & ${StyledInputField} {
        border-bottom: 1px solid var(--color-red-trs);
        color: var(--color-red-trs);
      }
      & ${StyledInputLabel} {
        color: var(--color-red-trs);
      }
    `}
`;
