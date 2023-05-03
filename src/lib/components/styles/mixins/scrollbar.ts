import { css } from 'styled-components';

export const scorllBarMixin = css`
  &::-webkit-scrollbar {
    visibility: hidden;
    width: 1rem;
    height: 1rem;
    opacity: 0;
    background-color: var(--color-gray-trs);
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
  }
  &::-webkit-scrollbar-thumb {
    opacity: 0;
    visibility: hidden;
    background-color: var(--color-gray-2);
    border-radius: 5rem;
  }
  &::-webkit-scrollbar-thumb {
    opacity: 1;
    visibility: visible;
  }
  &:hover::-webkit-scrollbar {
    opacity: 1;
    visibility: visible;
  }
`;
