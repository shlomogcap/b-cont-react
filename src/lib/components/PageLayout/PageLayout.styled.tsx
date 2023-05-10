import styled from 'styled-components';
import { Breakpoints } from '../../consts/stylesConsts';

export const StyledPageLayout = styled.div`
  min-width: fit-content;
  background-color: var(--color-bg-layout);
  .page {
    display: grid;
    position: relative;
    grid-template-columns: [sidebar] 7rem [center-start] 1fr [center-end];
    @media only screen and (min-width: ${Breakpoints.BigDesktop}) {
      grid-template-columns: [sidebar] 30rem [center-start] 1fr [center-end];
    }
  }
  main.content {
    padding: 3rem;
    display: grid;
    gap: 1rem;
    align-content: flex-start;
  }
`;
