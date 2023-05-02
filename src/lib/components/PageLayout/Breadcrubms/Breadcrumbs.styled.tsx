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
  & svg.icon {
    fill: var(--color-active-light);
  }
  &__link {
    color: white;
    background-color: var(--color-active-light);
    font: inherit;
    font-size: 1.8rem;
    border-radius: 1rem;
    font-weight: 550;
    padding: 0.2rem 1rem;
    transition: all 0.2s;
    white-space: nowrap;
    display: grid;
    grid-auto-flow: column;
    gap: 0.5rem;
    align-items: center;
    &[data-path]:hover {
      cursor: pointer;
      // background-color: var(--color-bg-3); //OLD_VERSION
      text-decoration: underline; //NEW
      transform: scale(1.07); //NEW
    }
  }
  &__iconList {
    visibility: hidden;
    opacity: 0;
    width: 0;
    transition: all 0.2s ease-in;
    fill: white;
  }
  &__link:hover > &__iconList {
    visibility: visible;
    opacity: 1;
    width: 3rem;
  }
`;
