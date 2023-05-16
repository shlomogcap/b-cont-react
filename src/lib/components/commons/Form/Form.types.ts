import { FormHTMLAttributes } from 'react';

export type IFormProps = FormHTMLAttributes<HTMLFormElement> & {
  className?: string;
};

export type IFormFooterProps = {
  className?: string;
};
