import { PROJECT_ACCOUNTS_DISPLAY_TEXTS } from '@/lib/consts/accounts';
import { NumberInput } from '../commons/Input';
import { IAccountFormProps } from './AccountForm.types';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { Form, FormFooter } from '../commons/Form';
import { AccountDoc, IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../commons/Button';
import { DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import { PercentageInput } from '../commons/Input/inputs/PercentageInput';
import { useEffect } from 'react';
import { CurrencyInput } from '../commons/Input/inputs/CurrencyInput';
import {
  StyledAccountFormCalcedValue,
  StyledAccountFormRow,
} from './AccountForm.styled';
import { getDisplayValue } from '../commons/Table';
import { toNumber } from '@/lib/utils/numberUtils';

const AccounFormFields = ({ readOnly }: Omit<IAccountFormProps, 'account'>) => {
  const [totalAccountToPay, indexedPercent, vatPercent, taxPercent] = useWatch({
    name: [
      EAccountFields.TotalAccountToPay,
      EAccountFields.IndexedPercent,
      EAccountFields.VatPercent,
      EAccountFields.TaxPercent,
    ],
  });
  return (
    <>
      <NumberInput
        label={
          PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.accountFields[
            EAccountFields.TotalAccountToPay
          ]
        }
        name={EAccountFields.TotalAccountToPay}
        readOnly
      />
      <StyledAccountFormRow>
        <PercentageInput
          label={
            PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.accountFields[
              EAccountFields.IndexedPercent
            ]
          }
          name={EAccountFields.IndexedPercent}
          readOnly={readOnly}
        />
        <StyledAccountFormCalcedValue>
          {getDisplayValue({
            value:
              (toNumber(indexedPercent) / 100) * toNumber(totalAccountToPay),
            type: 'currency',
          })}
        </StyledAccountFormCalcedValue>
      </StyledAccountFormRow>
      <StyledAccountFormRow>
        <PercentageInput
          label={
            PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.accountFields[
              EAccountFields.VatPercent
            ]
          }
          name={EAccountFields.VatPercent}
          readOnly={readOnly}
        />
        <StyledAccountFormCalcedValue>
          {getDisplayValue({
            value: (toNumber(vatPercent) / 100) * toNumber(totalAccountToPay),
            type: 'currency',
          })}
        </StyledAccountFormCalcedValue>
      </StyledAccountFormRow>
      <StyledAccountFormRow>
        <PercentageInput
          label={
            PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.accountFields[
              EAccountFields.TaxPercent
            ]
          }
          name={EAccountFields.TaxPercent}
          readOnly={readOnly}
        />
        <StyledAccountFormCalcedValue>
          {getDisplayValue({
            value: (toNumber(taxPercent) / 100) * toNumber(totalAccountToPay),
            type: 'currency',
          })}
        </StyledAccountFormCalcedValue>
      </StyledAccountFormRow>
      <CurrencyInput
        label={
          PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.accountFields[
            EAccountFields.TotalToPay
          ]
        }
        name={EAccountFields.TotalToPay}
        readOnly
      />
    </>
  );
};

export const AccountForm = ({ readOnly, account }: IAccountFormProps) => {
  const form = useForm<IAccountDoc>({
    resolver: zodResolver(AccountDoc),
    mode: 'onSubmit',
  });
  const { reset } = form;
  useEffect(() => {
    reset(account);
  }, [account, reset]);
  const onSubmit: SubmitHandler<IAccountDoc> = async (_values) => {
    // const { projectId, contractId } = queryParamsValues(router.query, [
    //   PROJECT_ID_QUERY,
    //   CONTRACT_ID_QUERY,
    // ]);
    // const collectionRef = collection(
    //   firestore,
    //   `projects/${projectId}/contracts/${contractId}/accounts`,
    // );
    // const data: IAccountDoc = {
    //   ...values,
    //   title: String(values.period),
    // };
    // try {
    //   await setDoc(collectionRef, data);
    //   closeModal();
    //   toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
    // } catch (err) {
    //   showToastError(err);
    // }
  };
  const onError: SubmitErrorHandler<IAccountDoc> = (errors) => {
    //TODO: promt error...
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
        <AccounFormFields readOnly={readOnly} />
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
