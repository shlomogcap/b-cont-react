import styled from 'styled-components';
import { StyledBreadcrumbs } from '../Breadcrubms/Breadcrumbs.styled';

export const StyledTopBar = styled.div`
  box-shadow: var(--box-shadow-light);
  background-color: white;
  z-index: 1000;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 5rem 1fr auto auto;
  grid-template-rows: min-content 3rem;
  align-items: center;
  gap: 0.2rem 2rem;
  & .title {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    .heading {
      color: var(--color-active);
      justify-self: center;
    }
    &-text {
      font-size: 3.2rem;
      font-weight: 500;
      color: var(--color-active);
    }
  }
  & .user-box {
    grid-column: 4;
  }
  & ${StyledBreadcrumbs} {
    grid-row: 2;
    margin-right: 33rem;
  }
`;
