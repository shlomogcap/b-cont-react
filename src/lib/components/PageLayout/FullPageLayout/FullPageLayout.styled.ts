import styled from 'styled-components';
import { StyledPageLayout } from '../PageLayout.styled';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { StyledTopBar } from '../TopBar/TopBar.styled';
import { StyledBreadcrumbs } from '../Breadcrubms/Breadcrumbs.styled';

export const StyledFullPageLayout = styled(StyledPageLayout)`
  min-height: 100vh;
`;
export const StyledArrowIcon = styled(ArrowIcon)`
  grid-column: 1;
  justify-self: center;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-0.2rem);
  }
  &:active {
    transform: translate(-0.1rem, 0.1rem);
  }
`;

export const StyledFullPageLayoutTopBar = styled(StyledTopBar)`
  height: auto;
  & ${StyledBreadcrumbs} {
    grid-column: 2;
    grid-row: 1;
    margin-inline-start: 0;
  }
`;
