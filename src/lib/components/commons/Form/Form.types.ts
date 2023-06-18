import { FormHTMLAttributes } from 'react';

export type TFormProps = FormHTMLAttributes<HTMLFormElement> & {
  className?: string;
};

export type TFormFooterProps = {
  className?: string;
};
