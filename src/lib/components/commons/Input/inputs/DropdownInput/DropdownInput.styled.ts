import { highlightRowMixin } from '@/lib/components/styles/mixins/highlightRow';
import styled from 'styled-components';
import { InputStyles } from '../../Input.styled';
import { XIcon } from '@/lib/components/icons/XIcon';

export const StyledDropdownInput = styled.div`
  position: relative;
`;

export const StyledDropdownList = styled.div`
  transition: all 0.2s;
  display: grid;
  width: 100%;
  min-width: fit-content;
  border-radius: 1rem;
  background-color: var(--color-white);
  color: var(--color-non-active);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  box-shadow: var(--box-shadow-1);
`;

export const StyledDropdownListItem = styled.div`
  font: inherit;
  cursor: pointer;
  font-size: 2rem;
  display: grid;
  align-items: center;
  justify-items: flex-end;
  padding: 1rem 2rem;
  grid-auto-flow: column;
  gap: 1rem;
  ${highlightRowMixin({ trigger: 'hover', side: 'left' })}
  &:hover {
    background-color: var(--color-bg-2);
  }
`;

export const StyledDropdownField = styled.div`
  ${InputStyles}
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
`;

export const StyledDropdownTag = styled.div`
  font-size: var(--font-size-small);
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
`;

export const StyledRemoveIcon = styled(XIcon)`
  &:hover {
    color: var(--color-red-trs) !important;
  }
`;
