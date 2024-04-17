import styled from 'styled-components';
import {
  EBreakpoints,
  FOOTER_HEIGHT,
  TOP_BAR_HEIGHT,
} from '../../consts/stylesConsts';

export const StyledPageLayout = styled.div`
  min-width: fit-content;
  background-color: var(--color-bg-layout);
  .page {
    display: grid;
    position: relative;
    min-height: calc(100vh - ${TOP_BAR_HEIGHT});
  }
  main.content {
    margin-inline-start: 15rem;
    padding: 3rem;
    display: grid;
    gap: 1rem;
    align-content: flex-start;
    margin-bottom: ${FOOTER_HEIGHT};
    @media only screen and (max-width: ${EBreakpoints.BigDesktop}) {
      margin-inline-start: 5rem;
    }
  }
`;
