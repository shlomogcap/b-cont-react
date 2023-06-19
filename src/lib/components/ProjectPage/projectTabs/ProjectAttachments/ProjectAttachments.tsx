import { EProjectAttahcmentFields } from '@/lib/consts/projectAttachments/ProjectAttachmentFields';
import { IProjectAttachmentsProps } from './ProjectAttachments.types';
import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { PROJECT_ATTACHMENTS_DISPLAY_TEXTS } from '@/lib/consts/projectAttachments/displayTexts';
import { PROJECT_ATTACHMENT_STATUS_OPTIONS } from './ProjectAttachments.consts';
import {
  COMMON_FIELDS_DISPLAY_TEXTS,
  ECommonFields,
} from '@/lib/consts/commonFields';
import { useProjectAttachmentsContext } from '@/lib/context/projectAttachmentsContext';

export const ProjectAttachments = (props: IProjectAttachmentsProps) => {
  const { isLoading, data: oddJobs } = useProjectAttachmentsContext();
  const columns: ITableColumn<EProjectAttahcmentFields | ECommonFields>[] = [
    {
      field: EProjectAttahcmentFields.Title,
      display:
        PROJECT_ATTACHMENTS_DISPLAY_TEXTS.he.fields[
          EProjectAttahcmentFields.Title
        ],
    },
    {
      field: EProjectAttahcmentFields.Description,
      display:
        PROJECT_ATTACHMENTS_DISPLAY_TEXTS.he.fields[
          EProjectAttahcmentFields.Description
        ],
    },
    {
      field: EProjectAttahcmentFields.Status,
      display:
        PROJECT_ATTACHMENTS_DISPLAY_TEXTS.he.fields[
          EProjectAttahcmentFields.Status
        ],
      type: 'list',
      options: PROJECT_ATTACHMENT_STATUS_OPTIONS,
    },
    {
      field: ECommonFields.CreatedAt,
      display: COMMON_FIELDS_DISPLAY_TEXTS.he[ECommonFields.CreatedAt],
      type: 'date',
    },
    {
      field: ECommonFields.CreatedBy,
      display: COMMON_FIELDS_DISPLAY_TEXTS.he[ECommonFields.CreatedBy],
      getValue: ({ row, field }) => 'TODO: get user by id ' + row[field],
    },
  ];
  return <Table loading={isLoading} columns={columns} rows={oddJobs} />;
};
