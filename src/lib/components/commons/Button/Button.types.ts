import { ButtonHTMLAttributes } from 'react';
import { IOptionsListProps } from '../OptionsList';

export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

export type IButtonMenuProps = IButtonProps & IOptionsListProps;
