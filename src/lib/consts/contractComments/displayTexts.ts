import { ILang } from '../displayTexts';
import { EContractCommentFields } from './ContractCommentFields';

type DisplayTextMapping = {
  fields: Record<EContractCommentFields, string>;
};

export const CONTRACT_COMMENTS_DISPLAY_TEXTS: Record<
  ILang,
  DisplayTextMapping
> = {
  he: {
    fields: {
      [EContractCommentFields.Title]: 'כותרת',
      [EContractCommentFields.Description]: 'תיאור',
      [EContractCommentFields.AccountRef]: 'קישור לחשבון',
      [EContractCommentFields.Pinned]: 'נעוץ',
    },
  },
  en: {
    fields: {
      [EContractCommentFields.Title]: 'Title',
      [EContractCommentFields.Description]: 'Description',
      [EContractCommentFields.AccountRef]: 'Account Ref',
      [EContractCommentFields.Pinned]: 'Pinned',
    },
  },
};
