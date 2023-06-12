import styled from 'styled-components';
import { InputStyles } from '../../Input.styled';
import { XIcon } from '@/lib/components/icons/XIcon';

export const StyledDropdownField = styled.div`
  ${InputStyles}
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
`;

export const StyledDropdownTag = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
`;

export const StyledRemoveIcon = styled(XIcon)`
  &:hover {
    color: var(--color-red-trs) !important;
  }
`;
