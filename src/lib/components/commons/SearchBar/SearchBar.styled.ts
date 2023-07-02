import styled from 'styled-components';
import { InputStyles } from '../Input/Input.styled';
import { XIcon } from '../../icons/XIcon';
import { SearchIcon } from '../../icons/SearchIcon';
export const StyledSearchInput = styled.input`
  ${InputStyles}
  position: absolute;
  width: 15rem;
  inset-inline-end: 0;
  padding-inline-end: 2rem;
  background: none;
  height: 4rem;
`;

export const StyledSearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledRemoveIcon = styled(XIcon)`
  position: absolute;
  z-index: 1;
  inset-inline-end: 0.2rem;
  &:hover {
    cursor: pointer;
    color: var(--color-red-trs) !important;
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  z-index: 1;
  inset-inline-end: 0.2rem;
`;
