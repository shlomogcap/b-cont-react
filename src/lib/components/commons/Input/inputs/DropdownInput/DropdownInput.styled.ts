import styled, { css } from 'styled-components';
import { InputStyles } from '../../Input.styled';
import { XIcon } from '@/lib/components/icons/XIcon';
import { IStyledDropdownFieldProps } from './DropdownInput.types';

export const StyledDropdownField = styled.div<IStyledDropdownFieldProps>`
  ${InputStyles}
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  background-color: unset !important;
  &&& {
    ${({ readOnly }) =>
      !readOnly &&
      css`
        background-color: unset !important;
      `}
  }
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
