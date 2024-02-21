import { ButtonHTMLAttributes } from 'react';
import { IOptionsListProps } from '../OptionsList';

export type IButtonSize = 'S' | 'M' | 'L' | 'XL';

export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: IButtonSize;
};

export type IButtonMenuProps = IButtonProps & IOptionsListProps;
export type IButtonMenuButtonProps = IButtonProps;
