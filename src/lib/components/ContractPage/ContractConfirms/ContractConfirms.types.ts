import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { EConfirmType } from '@/lib/consts/confirms/ConfirmType';

export type IContractConfirmsProps = {
  confirmType: EConfirmType;
  account: IAccountDoc;
  handleConfirmAccountStage: () => void;
  confirmEnabled: boolean;
};
