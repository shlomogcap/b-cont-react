import {
  CONTRACTS_DISPLAY_TEXTS,
  ContractDoc,
  IContractDoc,
  EContractFields,
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
  EButtonTexts,
  EToastType,
} from '@/lib/consts/displayTexts';
import { IContractFormProps } from './ContractForm.types';
import { firestore } from '@firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { PROJECT_ID_QUERY, ERoutesNames } from '@/lib/consts/routes';
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
import { EVendorFields } from '@/lib/consts/vendors';
import { ECommonFields } from '@/lib/consts/commonFields';
import { prepareFormData } from '@/lib/utils/prepareFormData';
import { showToastError } from '@/lib/utils/showToastError';

const ContractFormFields = ({ readOnly }: IContractFormProps) => {
  const { data: vendors } = useVendorsContext();
  return (
    <>
      <TextInput
        isRequired
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.Title]}
        name={EContractFields.Title}
        readOnly={readOnly}
      />
      <DropdownInput
        options={vendors.map((v) => ({
          text: v[EVendorFields.Title],
          value: String(v[ECommonFields.Id]),
        }))}
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.VendorRef]}
        name={EContractFields.VendorRef}
        readOnly={readOnly}
      />
      <TextInput
        label={
          CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.BudgetbudgetaryItem]
        }
        name={EContractFields.BudgetbudgetaryItem}
        readOnly={readOnly}
      />
      <DropdownInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.IsIndexed]}
        name={EContractFields.IsIndexed}
        options={IS_INDEXED_OPTIONS}
        readOnly={readOnly}
      />
      <NumberInput
        label={
          CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.TotalAgreementSum]
        }
        name={EContractFields.TotalAgreementSum}
        readOnly={readOnly}
      />
      <NumberInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.PaymentDelay]}
        name={EContractFields.PaymentDelay}
        onlyInteger
        max={365}
        readOnly={readOnly}
      />
      <DropdownInput
        options={CONTRACT_TYPE_OPTIONS}
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.ContractType]}
        name={EContractFields.ContractType}
        readOnly={readOnly}
      />
      {/* TODO: make percentageInput */}
      <NumberInput
        label={
          CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.DelayPercentage]
        }
        name={EContractFields.DelayPercentage}
        numericFormatProps={{
          suffix: '%',
        }}
        max={25}
        readOnly={readOnly}
      />
      <DateInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.SWorkDate]}
        name={EContractFields.SWorkDate}
        readOnly={readOnly}
      />
      <DateInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.EWorkDate]}
        name={EContractFields.EWorkDate}
        readOnly={readOnly}
      />
      <DropdownInput
        options={CONTRACT_STATUS_OPTIONS}
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.Status]}
        name={EContractFields.Status}
        readOnly={readOnly}
      />
      <TextInput
        label={CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.Description]}
        name={EContractFields.Description}
        readOnly={readOnly}
      />
    </>
  );
};

export const ContractForm = ({ id, readOnly }: IContractFormProps) => {
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
        toast.success(DISPLAY_TEXTS.he.toasts[EToastType.SavingDocData]);
      } catch (err) {
        showToastError(err);
      }
      return;
    }
    try {
      const collectionRef = collection(
        firestore,
        `projects/${projectId}/contracts`,
      );
      const res = await addDoc(collectionRef, preparedData);
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
      router.push({
        pathname: ERoutesNames.Project,
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
        <ContractFormFields readOnly={readOnly} />
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
