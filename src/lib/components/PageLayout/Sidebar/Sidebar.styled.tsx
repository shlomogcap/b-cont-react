import Link from 'next/link';
import styled from 'styled-components';
import { highlightRowMixin } from '../../styles/mixins/highlightRow';
import { Breakpoints, TOP_BAR_HEIGHT } from '../../consts/stylesConsts';

export const StyledSidebar = styled.aside`
  grid-column: sidebar / center-start;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15rem 1fr;
  font: inherit;
  background-color: var(--color-white);
  height: calc(100vh - ${TOP_BAR_HEIGHT});
  padding-top: 2rem;

  .hr {
    border-bottom: 0.5px solid var(--color-non-active);
    border-radius: 5px;
    width: 50%;
    opacity: 0.4;
    align-self: center;
    margin: 2rem auto;
  }
`;

export const StyledSidebarLink = styled(Link)`
  text-decoration: none;
  align-self: center;
  width: 100%;
  padding: 2rem;
  font: inherit;
  display: grid;
  grid-gap: 0.2rem 2rem;
  color: var(--color-non-active);
  align-items: center;
  cursor: pointer;
  ${highlightRowMixin({ side: 'left', trigger: 'hover' })}
  &:hover {
    background-color: var(--color-bg-2);
  }
  &.active {
    color: var(--color-active);
    ${highlightRowMixin({ side: 'left', trigger: 'constant' })}
  }
  & .text {
    display: none;
  }
  @media only screen and (min-width: ${Breakpoints.BigDesktop}) {
    grid-template-columns: 3rem 1fr;
    & .text {
      display: block;
    }
  }
`;
