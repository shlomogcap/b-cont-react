import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { DropdownInput } from '../commons/Input';
import { StyledPeriodSelectionModal } from './PeriodSelectionModal.styled';
import { IPeriodSelectionModalData } from './PeriodSelectionModal.types';
import { getAvailableMonthsPeriodsList } from './PeriodSelectionModal.utils';
import dayjs from 'dayjs';
import { Button } from '../commons/Button';
import { PERIOD_SELCTION_DISPLAY_TEXT } from './PeriodSelectionModal.consts';
import { Form, FormFooter } from '../commons/Form';
import {
  DISPLAY_TEXTS,
  EButtonTexts,
  EToastType,
} from '../../consts/displayTexts';
import { AccountDoc, IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';
import { EPeriodUnit } from '@/lib/consts/accounts/PeriodUnit';
import { useRouter } from 'next/router';
import { queryParamsValues } from '@/lib/utils/queryParamToString';
import { CONTRACT_ID_QUERY, PROJECT_ID_QUERY } from '@/lib/consts/routes';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { toast } from 'react-toastify';
import { EConfirmStatus } from '@/lib/consts/confirms/ConfirmStatus';

export const PeriodSelectionModal = ({
  lastPeriod,
  lastPeriodNumber,
  confirmFlow,
}: IPeriodSelectionModalData) => {
  const { closeModal } = useModalContext();
  const router = useRouter();
  const form = useForm<IAccountDoc>({
    defaultValues: {
      period: dayjs(lastPeriod || undefined)
        .add(1, 'months')
        .set('date', 1)
        .format('MM YYYY'),
      periodUnit: EPeriodUnit.M,
      periodFrequancey: 1,
      periodNumber: Number(lastPeriodNumber) + 1,
      confirmFlow: confirmFlow?.map((confirm) => ({
        ...confirm,
        confirmStatus: EConfirmStatus.Pending,
      })),
    },
    resolver: zodResolver(
      AccountDoc.omit({
        id: true,
        path: true,
        title: true,
      }),
    ),
  });
  const onSubmit: SubmitHandler<IAccountDoc> = async (values) => {
    const { projectId, contractId } = queryParamsValues(router.query, [
      PROJECT_ID_QUERY,
      CONTRACT_ID_QUERY,
    ]);
    const collectionRef = collection(
      firestore,
      `projects/${projectId}/contracts/${contractId}/accounts`,
    );
    const data: IAccountDoc = {
      ...values,
      title: String(values.period),
    };
    try {
      await addDoc(collectionRef, data);
      closeModal();
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
    } catch (err) {}
  };
  return (
    <FormProvider {...form}>
      <StyledPeriodSelectionModal title={PERIOD_SELCTION_DISPLAY_TEXT.he.title}>
        <Form>
          <DropdownInput
            label={PERIOD_SELCTION_DISPLAY_TEXT.he.fields.period}
            name='period'
            options={getAvailableMonthsPeriodsList({ lastPeriod }).map(
              (period) => ({
                text: period,
                value: period,
              }),
            )}
          />
          <FormFooter>
            <Button onClick={form.handleSubmit(onSubmit)}>
              {DISPLAY_TEXTS.he.buttons[EButtonTexts.Add]}
            </Button>
          </FormFooter>
        </Form>
      </StyledPeriodSelectionModal>
    </FormProvider>
  );
};
