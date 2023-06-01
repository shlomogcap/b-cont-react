import { IProjectAttahcmentFields } from '@/lib/consts/projectAttachments/ProjectAttachmentFields';
import { IProjectAttachmentsProps } from './ProjectAttachments.types';
import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { PROJECT_ATTACHMENTS_DISPLAY_TEXTS } from '@/lib/consts/projectAttachments/displayTexts';
import { PROJECT_ATTACHMENT_STATUS_OPTIONS } from './ProjectAttachments.consts';
import {
  COMMON_FIELDS_DISPLAY_TEXTS,
  ICommonFields,
} from '@/lib/consts/commonFields';
import { useProjectAttachmentsContext } from '@/lib/context/projectAttachmentsContext';

export const ProjectAttachments = (props: IProjectAttachmentsProps) => {
  const { isLoading, data: oddJobs } = useProjectAttachmentsContext();
  const columns: ITableColumn<IProjectAttahcmentFields | ICommonFields>[] = [
    {
      field: IProjectAttahcmentFields.Title,
      display:
        PROJECT_ATTACHMENTS_DISPLAY_TEXTS.he.fields[
          IProjectAttahcmentFields.Title
        ],
    },
    {
      field: IProjectAttahcmentFields.Description,
      display:
        PROJECT_ATTACHMENTS_DISPLAY_TEXTS.he.fields[
          IProjectAttahcmentFields.Description
        ],
    },
    {
      field: IProjectAttahcmentFields.Status,
      display:
        PROJECT_ATTACHMENTS_DISPLAY_TEXTS.he.fields[
          IProjectAttahcmentFields.Status
        ],
      type: 'list',
      options: PROJECT_ATTACHMENT_STATUS_OPTIONS,
    },
    {
      field: ICommonFields.CreatedAt,
      display: COMMON_FIELDS_DISPLAY_TEXTS.he[ICommonFields.CreatedAt],
      type: 'date',
    },
    {
      field: ICommonFields.CreatedBy,
      display: COMMON_FIELDS_DISPLAY_TEXTS.he[ICommonFields.CreatedBy],
      getValue: ({ row, field }) => 'TODO: get user by id ' + row[field],
    },
  ];
  return <Table loading={isLoading} columns={columns} rows={oddJobs} />;
};
