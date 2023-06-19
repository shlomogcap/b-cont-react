import { ButtonHTMLAttributes } from 'react';

export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};
