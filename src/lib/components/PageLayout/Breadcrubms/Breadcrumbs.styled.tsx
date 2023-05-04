import styled from 'styled-components';
import { Breakpoints } from '../../consts/stylesConsts';

export const StyledBreadcrumbs = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
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
