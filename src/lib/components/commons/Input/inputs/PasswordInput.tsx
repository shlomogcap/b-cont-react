import { useState } from 'react';
import { InputControl } from '../Input';
import { StyledInputField } from '../Input.styled';
import { IInputProps } from '../Input.types';
import { EyeIcon } from '@/lib/components/icons/EyeIcon';
import styled from 'styled-components';
import { StyledSvgIcon } from '@/lib/components/icons/SvgIcon/SvgIcon.styled';

const StyledPasswordInput = styled.div`
  position: relative;
  & ${StyledSvgIcon} {
    position: absolute;
    inset-inline-end: 0.5rem;
    inset-block-end: 1.5rem;
    z-index: 1;
  }
`;

export const PasswordInput = (props: Omit<IInputProps, 'inputElement'>) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const toggleShowingPassword = () => setIsShowingPassword((state) => !state);
  return (
    <InputControl
      {...props}
      inputElement={
        <StyledPasswordInput>
          <StyledInputField type={isShowingPassword ? 'text' : 'password'} />
          <EyeIcon
            onClick={toggleShowingPassword}
            toggleMode={isShowingPassword ? 'hide' : 'show'}
          />
        </StyledPasswordInput>
      }
    />
  );
};
