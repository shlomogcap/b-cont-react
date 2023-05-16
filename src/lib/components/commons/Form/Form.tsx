import { PropsWithChildren } from 'react';
import { IFormFooterProps, IFormProps } from './Form.types';
import { StyledForm, StyledFormFooter } from './Form.styled';

export const Form = ({
  className,
  children,
  ...formProps
}: PropsWithChildren<IFormProps>) => {
  return (
    <StyledForm
      onSubmit={(e) => e.preventDefault()}
      className={className}
      {...formProps}
    >
      {children}
    </StyledForm>
  );
};

export const FormFooter = ({
  className,
  children,
}: PropsWithChildren<IFormFooterProps>) => {
  return <StyledFormFooter className={className}>{children}</StyledFormFooter>;
};
