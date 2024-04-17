import styled from 'styled-components';
import { StyledBreadcrumbs } from '../Breadcrubms/Breadcrumbs.styled';
import { TOP_BAR_HEIGHT } from '../../../consts/stylesConsts';
import { Logo } from '../Logo';
import { StyledUserAvatar } from '../UserAvatar/UserAvatar.styled';

export const StyledTopBar = styled.div`
  box-shadow: var(--box-shadow-light);
  background-color: white;
  z-index: 1000;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: ${TOP_BAR_HEIGHT};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 5rem 1fr auto auto;
  grid-template-rows: 6rem auto;
  align-items: center;
  gap: 0.2rem 2rem;
  & .title {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    &-text {
      justify-self: center;
      font-size: var(--font-size-xl);
      font-weight: 500;
      color: var(--color-active);
    }
  }
  & ${StyledUserAvatar} {
    grid-column: 4;
    margin-inline-end: 0.5rem;
    cursor: pointer;
  }
  & ${StyledBreadcrumbs} {
    grid-column: 1/-1;
    grid-row: 2;
    margin-inline-start: 7rem;
  }
`;

export const StyledLogo = styled(Logo)``;
