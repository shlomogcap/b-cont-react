import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../commons/Button';
import { Form, FormFooter } from '../commons/Form';
import { StyledEditUserModal } from './EditUserForm.styled';
import { IEditUserFormModalData } from './EditUserForm.types';
import { TextInput } from '../commons/Input';
import { PasswordInput } from '../commons/Input/inputs/PasswordInput';
import {
  EEditUserActions,
  EEditUserFields,
  EDIT_USER_DISPLAY_TEXTS,
  EDIT_USER_TABS,
  EEditUserTabs,
  PASSWORD_RESOLVER_SCHEMA,
} from './EditUserForm.consts';
import { auth } from '@/lib/firebase';
import { updateProfile, updatePassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { toast } from 'react-toastify';
import { DISPLAY_TEXTS, EToastType } from '@/lib/consts/displayTexts';
import { showToastError } from '@/lib/utils/showToastError';
import { Tabs } from '../commons/Tabs';
import { zodResolver } from '@hookform/resolvers/zod';

const EditUserInfo = () => {
  const form = useForm({
    defaultValues: {
      [EEditUserFields.Email]: '',
      [EEditUserFields.DisplayName]: '',
    },
  });
  const { reset, handleSubmit } = form;
  useEffect(() => {
    reset({
      [EEditUserFields.Email]: auth.currentUser?.email ?? '',
      [EEditUserFields.DisplayName]: auth.currentUser?.displayName ?? '',
    });
  }, [reset]);
  const { closeModal } = useModalContext();
  const onSubmit = handleSubmit(async (values) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: values[EEditUserFields.DisplayName],
        });
        toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
        closeModal();
      } catch (err) {
        showToastError(err);
      }
    }
  });
  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit}>
        <TextInput
          label={EDIT_USER_DISPLAY_TEXTS.he.fields[EEditUserFields.Email]}
          name={EEditUserFields.Email}
          readOnly
        />
        <TextInput
          label={EDIT_USER_DISPLAY_TEXTS.he.fields[EEditUserFields.DisplayName]}
          name={EEditUserFields.DisplayName}
        />
        <FormFooter>
          <Button type='submit'>
            {EDIT_USER_DISPLAY_TEXTS.he.actions[EEditUserActions.Update]}
          </Button>
        </FormFooter>
      </Form>
    </FormProvider>
  );
};
const ResetUserPassword = () => {
  const { closeModal } = useModalContext();
  const form = useForm({
    defaultValues: {
      [EEditUserFields.Password]: '',
      [EEditUserFields.RepeatPassword]: '',
    },
    resolver: zodResolver(PASSWORD_RESOLVER_SCHEMA),
  });
  const { handleSubmit } = form;
  const onSubmit = handleSubmit(async (values) => {
    if (auth.currentUser) {
      try {
        await updatePassword(
          auth.currentUser,
          values[EEditUserFields.Password],
        );
        toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
        closeModal();
      } catch (err) {
        showToastError(err);
      }
    }
  });
  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit}>
        <PasswordInput
          label={EDIT_USER_DISPLAY_TEXTS.he.fields[EEditUserFields.Password]}
          name={EEditUserFields.Password}
        />
        <PasswordInput
          label={
            EDIT_USER_DISPLAY_TEXTS.he.fields[EEditUserFields.RepeatPassword]
          }
          name={EEditUserFields.RepeatPassword}
        />
        <FormFooter>
          <Button type='submit'>
            {EDIT_USER_DISPLAY_TEXTS.he.actions[EEditUserActions.Reset]}
          </Button>
        </FormFooter>
      </Form>
    </FormProvider>
  );
};

export const EditUserModal = (_props: IEditUserFormModalData) => {
  const [activeTab, setActiveTab] = useState(EEditUserTabs.Info);
  return (
    <StyledEditUserModal title={EDIT_USER_DISPLAY_TEXTS.he.title}>
      <div style={{ marginTop: '1rem' }} />
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={EDIT_USER_TABS}
      />
      {activeTab === EEditUserTabs.Info && <EditUserInfo />}
      {activeTab === EEditUserTabs.Password && <ResetUserPassword />}
    </StyledEditUserModal>
  );
};
