import styled, { css } from 'styled-components';
import { StyledSvgIcon } from '../../icons/SvgIcon/SvgIcon.styled';
import { TriangleArrowIcon } from '../../icons/TriangleArrowIcon';
import { IStyledBreadcrumbProps } from './Breadcrumbs.types';

export const StyledBreadcrumbs = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledNavListArrow = styled(TriangleArrowIcon)`
  transition: all 0.2s ease-in;
  visibility: hidden;
  width: 0;
`;

export const StyledBreadcrumb = styled.div<IStyledBreadcrumbProps>`
  color: white;
  background-color: var(--color-active-light);
  font: inherit;
  font-size: var(--font-size-normal);
  border-radius: 1rem;
  font-weight: 550;
  padding: 0.2rem 1rem;
  transition: all 0.2s;
  white-space: nowrap;
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  align-items: center;
  ${({ actionable, hasArrow }) =>
    actionable &&
    !hasArrow &&
    css`
      &:hover {
        cursor: pointer;
        text-decoration: underline;
        transform: scale(1.07);
      }
    `}
  ${({ hasArrow }) =>
    hasArrow &&
    css`
      &:hover {
        cursor: pointer;
        transform: scaleX(calc(100% + 1rem));
      }
      &:hover ${StyledNavListArrow} {
        visibility: visible;
        width: 2rem;
      }
    `}
`;
