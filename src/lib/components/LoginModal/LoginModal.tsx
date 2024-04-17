import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../commons/Button';
import { Form, FormFooter } from '../commons/Form';
import { StyledLoginModal } from './LoginModal.styled';
import { ILoginModalData } from './LoginModal.types';
import { TextInput } from '../commons/Input';
import { PasswordInput } from '../commons/Input/inputs/PasswordInput';
import {
  ELoginActions,
  ELoginFields,
  LOGIN_DISPLAY_TEXTS,
} from './LoginModal.consts';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const LoginModal = (props: ILoginModalData) => {
  const form = useForm({
    defaultValues: { [ELoginFields.Email]: '', [ELoginFields.Password]: '' },
  });
  const handeLogin = form.handleSubmit((values) => {
    signInWithEmailAndPassword(
      auth,
      values[ELoginFields.Email],
      values[ELoginFields.Password],
    );
  });
  return (
    <StyledLoginModal disabledOutsideClick title={LOGIN_DISPLAY_TEXTS.he.title}>
      <FormProvider {...form}>
        <Form onSubmit={handeLogin}>
          <TextInput
            label={LOGIN_DISPLAY_TEXTS.he.fields[ELoginFields.Email]}
            name={ELoginFields.Email}
          />
          <PasswordInput
            label={LOGIN_DISPLAY_TEXTS.he.fields[ELoginFields.Password]}
            name={ELoginFields.Password}
          />
          <FormFooter>
            <Button type='submit'>
              {LOGIN_DISPLAY_TEXTS.he.actions[ELoginActions.Login]}
            </Button>
          </FormFooter>
        </Form>
      </FormProvider>
    </StyledLoginModal>
  );
};
