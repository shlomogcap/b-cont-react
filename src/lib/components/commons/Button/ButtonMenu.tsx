import { PropsWithChildren } from 'react';
import { OptionsList } from '../OptionsList';
import { useOptionsListContext } from '../OptionsList/OptionsList.provider';
import { StyledButtonMenuButton } from './Button.styled';
import { IButtonMenuButtonProps, IButtonMenuProps } from './Button.types';

const ButtonMenuButton = ({
  ...buttonProps
}: PropsWithChildren<IButtonMenuButtonProps>) => {
  const { openList } = useOptionsListContext();
  return (
    <StyledButtonMenuButton
      {...buttonProps}
      onClick={(e) => {
        e.stopPropagation();
        openList();
      }}
    />
  );
};

export const ButtonMenu = ({
  children,
  options,
  className,
}: PropsWithChildren<IButtonMenuProps>) => {
  return (
    <OptionsList options={options}>
      <ButtonMenuButton className={className}>{children}</ButtonMenuButton>
    </OptionsList>
  );
};
