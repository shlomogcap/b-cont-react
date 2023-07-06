import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { ContractConfirms } from '../ContractConfirms';
import { IContractActualsProps } from './ContractActuals.types';

export const ContractActuals = (props: IContractActualsProps) => {
  const account = {
    accountStage: 'finish',
    period: '2020-04',
  } as IAccountDoc; //TODO: get from context with current account
  return (
    <>
      <ContractConfirms acccount={account} />
      <div>chat</div>
      <div>report</div>
    </>
  );
};
