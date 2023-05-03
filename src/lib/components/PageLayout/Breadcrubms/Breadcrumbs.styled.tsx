import styled from 'styled-components';
import { Breakpoints } from '../../consts/stylesConsts';

export const StyledBreadcrumbs = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
  overflow-x: scroll;
  grid-column: 1/-1;
  justify-content: flex-start;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    border-radius: 1rem;
  }
  @media only screen and (max-width: ${Breakpoints.Phone}) {
    &:hover::-webkit-scrollbar {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const StyledBreadcrumb = styled.div`
  color: white;
  background-color: var(--color-active-light);
  font: inherit;
  font-size: 1.4rem;
  border-radius: 1rem;
  font-weight: 550;
  padding: 0.2rem 1rem;
  transition: all 0.2s;
  white-space: nowrap;
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  align-items: center;
  & svg.icon {
    fill: var(--color-active-light);
  }
  &__iconList {
    visibility: hidden;
    opacity: 0;
    width: 0;
    transition: all 0.2s ease-in;
    fill: white;
  }
  &:hover > &__iconList {
    visibility: visible;
    opacity: 1;
    width: 3rem;
  }
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    transform: scale(1.07);
  }
`;
