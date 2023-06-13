import { PropsWithChildren } from 'react';
import { OptionsList } from '../OptionsList';
import { useOptionsListContext } from '../OptionsList/OptionsList.provider';
import { StyledButton } from './Button.styled';
import { IButtonMenuProps, IButtonProps } from './Button.types';

const ButtonMenuButton = ({ children }: PropsWithChildren<{}>) => {
  const { openList } = useOptionsListContext();
  return (
    <StyledButton
      onClick={(e) => {
        e.stopPropagation();
        openList();
      }}
    >
      {children}
    </StyledButton>
  );
};

export const ButtonMenu = ({
  children,
  options,
}: PropsWithChildren<IButtonMenuProps>) => {
  return (
    <OptionsList options={options}>
      <ButtonMenuButton>{children}</ButtonMenuButton>
    </OptionsList>
  );
};
