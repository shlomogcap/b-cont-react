import { PAYMENTS_DISPLAY_TEXTS } from '@/lib/consts/payments/displayTexts';
import { DateInput, DropdownInput, TextInput } from '../commons/Input';
import { IPaymentFormProps } from './PaymentForm.types';
import { EPaymentFields } from '@/lib/consts/payments/PaymentFields';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Form, FormFooter } from '../commons/Form';
import { Button } from '../commons/Button';
import { DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import { IPaymentDoc, PaymentDoc } from '@/lib/consts/payments/PaymentDoc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Modal } from '../commons/Modal';
import { CurrencyInput } from '../commons/Input/inputs/CurrencyInput';
import {
  PAYMENT_CHANNEL_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
} from './PaymentForm.consts';

const PaymentFormFields = ({
  readOnly,
}: Pick<IPaymentFormProps, 'readOnly'>) => {
  return (
    <>
      <DateInput
        label={PAYMENTS_DISPLAY_TEXTS.he.fields[EPaymentFields.PaymentDate]}
        name={EPaymentFields.PaymentDate}
        readOnly={readOnly}
      />
      <DropdownInput
        label={PAYMENTS_DISPLAY_TEXTS.he.fields[EPaymentFields.PaymentChannel]}
        name={EPaymentFields.PaymentChannel}
        readOnly={readOnly}
        options={PAYMENT_CHANNEL_OPTIONS}
      />
      <DropdownInput
        label={PAYMENTS_DISPLAY_TEXTS.he.fields[EPaymentFields.PaymentType]}
        name={EPaymentFields.PaymentType}
        readOnly={readOnly}
        options={PAYMENT_TYPE_OPTIONS}
      />
      <TextInput
        label={
          PAYMENTS_DISPLAY_TEXTS.he.fields[EPaymentFields.PaymentIdentifier]
        }
        name={EPaymentFields.PaymentIdentifier}
        readOnly={readOnly}
      />
      <CurrencyInput
        label={PAYMENTS_DISPLAY_TEXTS.he.fields[EPaymentFields.Sum]}
        name={EPaymentFields.Sum}
        readOnly={readOnly}
      />
      <TextInput
        label={PAYMENTS_DISPLAY_TEXTS.he.fields[EPaymentFields.Description]}
        name={EPaymentFields.Description}
        readOnly={readOnly}
      />
    </>
  );
};

export const PaymentForm = ({ readOnly, payment }: IPaymentFormProps) => {
  const form = useForm<IPaymentDoc>({
    resolver: zodResolver(PaymentDoc),
    mode: 'onSubmit',
  });
  const { reset } = form;
  useEffect(() => {
    reset(payment);
  }, [payment, reset]);
  const onSubmit: SubmitHandler<IPaymentDoc> = async (_values) => {};
  const onError: SubmitErrorHandler<IPaymentDoc> = (errors) => {
    console.table(
      Object.entries(errors).reduce(
        (acc, [field, err]) => ({ ...acc, [field]: err.message }),
        {},
      ),
    );
  };
  const abortChanges = () => {
    form.reset();
  };
  return (
    <FormProvider {...form}>
      <Form>
        <PaymentFormFields readOnly={readOnly} />;
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

export const PaymentFormModal = (props: IPaymentFormProps) => {
  return (
    <Modal title={''}>
      <PaymentForm {...props} />
    </Modal>
  );
};
