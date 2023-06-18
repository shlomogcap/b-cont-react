import { ButtonHTMLAttributes } from 'react';

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};
