import styled from 'styled-components';
import { SearchIcon } from '../../icons/SearchIcon';
import { SvgIcon } from '../../icons/SvgIcon';

export const StyledSearchIcon = styled(SvgIcon)`
  position: absolute;
  left: 0;
`;

export const StyledSearchInput = styled.input`
  font: inherit;
  font-size: 1.8rem;
  padding: 1.2rem 0;
  padding-left: 2.2rem;
  font-weight: var(--font-w-2);
  border: none;
  outline: none;
  text-overflow: ellipsis;
  transition: all 0.2s ease-in-out;
  width: 15rem;
  height: 2.5rem;
  border-bottom: 2px solid lightgray;
  &:focus {
    border-bottom: 2px solid var(--color-active);
  }
`;

export const StyledSearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
