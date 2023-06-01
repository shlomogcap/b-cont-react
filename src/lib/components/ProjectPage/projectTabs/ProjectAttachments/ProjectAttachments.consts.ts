import { ITableColumnOption } from '@/lib/components/commons/Table';
import { IProjectAttahcmentStatus } from '@/lib/consts/projectAttachments/ProjectAttachmentStatus';
import { PROJECT_ATTACHMENTS_DISPLAY_TEXTS } from '@/lib/consts/projectAttachments/displayTexts';

export const PROJECT_ATTACHMENT_STATUS_OPTIONS: ITableColumnOption[] =
  Object.values(IProjectAttahcmentStatus).map((status) => ({
    text: PROJECT_ATTACHMENTS_DISPLAY_TEXTS.he.status[status],
    value: status,
  }));
