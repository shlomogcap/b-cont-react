import {
  CONTRACTS_DISPLAY_TEXTS,
  ContractDoc,
  IContractDoc,
  IContractFields,
} from '@/lib/consts/contracts';
import React, { useEffect } from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormFooter } from '../commons/Form';
import {
  DateInput,
  DropdownInput,
  NumberInput,
  TextInput,
} from '../commons/Input';
import { Button } from '../commons/Button';
import {
  DISPLAY_TEXTS,
  IButtonTexts,
  IToastType,
} from '@/lib/consts/displayTexts';
import { IContractFormProps } from './ContractForm.types';
import { firestore } from '@firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { PROJECT_ID_QUERY, IRoutesNames } from '@/lib/consts/routes';
import { toast } from 'react-toastify';
import { useContractContext } from '@/lib/context/contractContext';
import {
  CONTRACT_FORM_DEFAULT_VALUES,
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
  IS_INDEXED_OPTIONS,
} from './ContractForm.consts';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import { IVendorFields } from '@/lib/consts/vendors';
import { ICommonFields } from '@/lib/consts/commonFields';
import { FirebaseError } from 'firebase/app';
import { prepareFormData } from '@/lib/utils/prepareFormData';

const ContractFormFields = () => {
  const { data: vendors } = useVendorsContext();
  return (
    <>
      <TextInput
        isRequired
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.Title]}
        name={IContractFields.Title}
      />
      <DropdownInput
        options={vendors.map((v) => ({
          text: v[IVendorFields.Title],
          value: String(v[ICommonFields.Id]),
        }))}
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.VendorRef]}
        name={IContractFields.VendorRef}
      />
      <TextInput
        label={
          CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.BudgetbudgetaryItem]
        }
        name={IContractFields.BudgetbudgetaryItem}
      />
      <DropdownInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.IsIndexed]}
        name={IContractFields.IsIndexed}
        options={IS_INDEXED_OPTIONS}
      />
      <NumberInput
        label={
          CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.TotalAgreementSum]
        }
        name={IContractFields.TotalAgreementSum}
      />
      <NumberInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.PaymentDelay]}
        name={IContractFields.PaymentDelay}
        onlyInteger
        max={365}
      />
      <DropdownInput
        options={CONTRACT_TYPE_OPTIONS}
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.ContractType]}
        name={IContractFields.ContractType}
      />
      {/* TODO: make percentageInput */}
      <NumberInput
        label={
          CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.DelayPercentage]
        }
        name={IContractFields.DelayPercentage}
        numericFormatProps={{
          suffix: '%',
        }}
        max={25}
      />
      <DateInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.SWorkDate]}
        name={IContractFields.SWorkDate}
      />
      <DateInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.EWorkDate]}
        name={IContractFields.EWorkDate}
      />
      <DropdownInput
        options={CONTRACT_STATUS_OPTIONS}
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.Status]}
        name={IContractFields.Status}
      />
      <TextInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.Description]}
        name={IContractFields.Description}
      />
    </>
  );
};

export const ContractForm = ({ id }: IContractFormProps) => {
  const isEditMode = Boolean(id);
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const {
    data: { contract },
    isLoading,
  } = useContractContext();
  const form = useForm<IContractDoc>({
    resolver: zodResolver(ContractDoc),
    defaultValues: CONTRACT_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { reset } = form;

  useEffect(() => {
    if (isEditMode && !isLoading) {
      if (contract && id) {
        reset(contract);
      }
    }
  }, [isLoading, isEditMode, reset, id, contract]);

  const onSubmit: SubmitHandler<IContractDoc> = async (data) => {
    const preparedData = prepareFormData(data);
    if (isEditMode) {
      try {
        const docRef = doc(firestore, `projects/${projectId}/contracts/${id}`);
        await setDoc(docRef, preparedData, { merge: true });
        toast.success(DISPLAY_TEXTS.he.toasts[IToastType.SavingDocData]);
      } catch (err) {
        toast.error(
          err instanceof FirebaseError
            ? err.message
            : JSON.stringify(err ?? { error: 'Unexpected Error' }),
        );
        console.error(err);
      }
      return;
    }
    try {
      const collectionRef = collection(
        firestore,
        `projects/${projectId}/contracts`,
      );
      const res = await addDoc(collectionRef, preparedData);
      toast.success(DISPLAY_TEXTS.he.toasts[IToastType.AddingNewDoc]);
      router.push({
        pathname: IRoutesNames.Project,
        query: { [PROJECT_ID_QUERY]: res.id },
      });
    } catch (err) {
      //TODO: promt error...
      console.error(err);
    }
  };
  const onError: SubmitErrorHandler<IContractDoc> = (errors) => {
    //TODO: promt error...
    console.log('ERROR:', errors);
  };
  const abortChanges = () => {
    if (isEditMode) {
    } else {
      form.reset(CONTRACT_FORM_DEFAULT_VALUES);
    }
  };

  return (
    <FormProvider {...form}>
      <Form>
        <ContractFormFields />
        {form.formState.isDirty && (
          <FormFooter>
            <Button onClick={form.handleSubmit(onSubmit, onError)}>
              {DISPLAY_TEXTS.he.buttons[IButtonTexts.Save]}
            </Button>
            <Button variant='secondary' onClick={abortChanges}>
              {DISPLAY_TEXTS.he.buttons[IButtonTexts.Cancel]}
            </Button>
          </FormFooter>
        )}
      </Form>
    </FormProvider>
  );
};
