import { ESectionFields } from '@/lib/consts/sections';
import { IGroupDoc, IWorkspaceDoc } from '@/lib/consts/workspaces';
import { safeJSONParse } from '@/lib/utils/safeJsonParse';
import { useFormContext, useWatch } from 'react-hook-form';
import { IDropdownOption } from '../commons/Input/inputs/DropdownInput';
import { useEffect } from 'react';
import { IContractSectionFormFieldsProps } from './ContractSectionForm.types';

export const useGetGroupsOptions = (
  groupsOptions: IContractSectionFormFieldsProps['groupsOptions'],
) => {
  const { setValue } = useFormContext();
  const selectedWorkspaceValue = useWatch({
    name: ESectionFields.WorkspaceAreaRef,
  });
  const selectedWorkspace = safeJSONParse<IWorkspaceDoc>(
    selectedWorkspaceValue,
  );
  useEffect(() => {
    if (!selectedWorkspaceValue) {
      setValue(ESectionFields.WorkspaceGroupRef, '');
    }
  }, [selectedWorkspaceValue, setValue]);
  return selectedWorkspaceValue
    ? groupsOptions.filter(
        ({ value }) =>
          safeJSONParse<IGroupDoc>(value)?.parent === selectedWorkspace?.path,
      )
    : [];
};
