import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Modal } from '../commons/Modal';
import { IContractCommentFormProps } from './ContractCommentForm.types';
import { Form, FormFooter } from '../commons/Form';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { useRouter } from 'next/router';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import {
  ContractCommentDoc,
  IContractCommentDoc,
} from '@/lib/consts/contractComments/ContractCommentDoc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { uuid } from '@/lib/utils/uuid';
import { prepareFormData } from '@/lib/utils/prepareFormData';
import { toast } from 'react-toastify';
import {
  DISPLAY_TEXTS,
  EButtonTexts,
  EToastType,
} from '@/lib/consts/displayTexts';
import { showToastError } from '@/lib/utils/showToastError';
import { CONTRACT_ID_QUERY, PROJECT_ID_QUERY } from '@/lib/consts/routes';
import { TextInput } from '../commons/Input';
import { EContractCommentFields } from '@/lib/consts/contractComments/ContractCommentFields';
import { Button } from '../commons/Button';
import { CONTRACT_COMMENTS_DISPLAY_TEXTS } from '@/lib/consts/contractComments/displayTexts';

export const ContractCommentFormFields = ({
  readOnly,
}: IContractCommentFormProps) => {
  return (
    <>
      <TextInput
        name={EContractCommentFields.Title}
        label={
          CONTRACT_COMMENTS_DISPLAY_TEXTS.he.fields[
            EContractCommentFields.Title
          ]
        }
        readOnly={readOnly}
      />
      <TextInput
        name={EContractCommentFields.Description}
        label={
          CONTRACT_COMMENTS_DISPLAY_TEXTS.he.fields[
            EContractCommentFields.Description
          ]
        }
        readOnly={readOnly}
      />
    </>
  );
};

export const ContractCommentForm = ({
  readOnly,
  comment,
}: IContractCommentFormProps) => {
  const { closeModal } = useModalContext();
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const contractId = queryParamToString(router.query, CONTRACT_ID_QUERY);
  const isEditMode = Boolean(comment);
  const form = useForm<IContractCommentDoc>({
    resolver: zodResolver(ContractCommentDoc.omit({ id: true, path: true })),
    mode: 'onSubmit',
  });
  const { reset } = form;
  useEffect(() => {
    reset(comment);
  }, [comment, reset]);
  const onSubmit: SubmitHandler<IContractCommentDoc> = async (formData) => {
    try {
      const docRef = doc(
        firestore,
        `projects/${projectId}/contracts/${contractId}/comments/${
          comment?.id ?? uuid()
        }`,
      );
      const preparedData = prepareFormData(formData);
      await setDoc(docRef, preparedData, { merge: true });
      toast.success(
        DISPLAY_TEXTS.he.toasts[
          isEditMode ? EToastType.SavingDocData : EToastType.AddingNewDoc
        ],
      );
      closeModal();
    } catch (err) {
      showToastError(err);
    }
    return;
  };
  const onError: SubmitErrorHandler<IContractCommentDoc> = (errors) => {
    console.table(
      Object.entries(errors).reduce(
        (acc, [field, err]) => ({ ...acc, [field]: err.message }),
        {},
      ),
    );
    showToastError(errors, CONTRACT_COMMENTS_DISPLAY_TEXTS.he.fields);
  };
  const abortChanges = () => {
    form.reset();
  };
  return (
    <FormProvider {...form}>
      <Form>
        <ContractCommentFormFields readOnly={readOnly} />
        {form.formState.isDirty && (
          <FormFooter>
            <Button onClick={form.handleSubmit(onSubmit, onError)}>
              {DISPLAY_TEXTS.he.buttons[EButtonTexts.Save]}
            </Button>
            <Button variant='secondary' onClick={abortChanges}>
              {DISPLAY_TEXTS.he.buttons[EButtonTexts.Cancel]}
            </Button>
          </FormFooter>
        )}
      </Form>
    </FormProvider>
  );
};

export const ContractCommentFormModal = (props: IContractCommentFormProps) => {
  return (
    <Modal title={''}>
      <ContractCommentForm {...props} />
    </Modal>
  );
};
