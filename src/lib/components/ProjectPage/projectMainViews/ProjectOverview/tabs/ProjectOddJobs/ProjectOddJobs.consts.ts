import { ITableColumnOption } from '@/lib/components/commons/Table';
import { IOddJobStatus } from '@/lib/consts/oddJobs/OddJobStatus';
import { ODD_JOBS_DISPLAY_TEXTS } from '@/lib/consts/oddJobs/displayTexts';

export const ODD_JOBS_STATUS_OPTIONS: ITableColumnOption[] = Object.values(
  IOddJobStatus,
).map((status) => ({
  text: ODD_JOBS_DISPLAY_TEXTS.he.status[status],
  value: status,
}));
