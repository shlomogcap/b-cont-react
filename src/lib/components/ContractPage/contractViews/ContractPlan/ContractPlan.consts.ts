import { IReportTableSection } from '@/lib/components/ReportTable';
import { ITableColumn } from '@/lib/components/commons/Table';
import { ESectionFields, SECTIONS_DISPALY_TEXTS } from '@/lib/consts/sections';

export const CONTRACT_SECTIONS_COLUMNS: ITableColumn<ESectionFields>[] = [
  {
    field: ESectionFields.Title,
    display: SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.Title],
  },
  {
    field: ESectionFields.ItemPrice,
    display: SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemPrice],
    type: 'number',
  },
  {
    field: ESectionFields.ItemsCount,
    display: SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemsCount],
    type: 'number',
  },
  {
    field: ESectionFields.TotalSum,
    display: SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.TotalSum],
    type: 'number',
  },
];

export const DUMMY_REPORT_DATA: IReportTableSection<ESectionFields>[] = [
  {
    title: 'Workspace Area A',
    // level: 'main',
    sections: [
      {
        title: 'Group A.1',
        // level: 'secondary',
        rows: [
          {
            id: 'a11',
            title: 'Section A.1.1',
            itemPrice: 50_000,
            itemsCount: 8,
            totalSum: 50_000 * 8,
          },
          {
            id: 'a12',
            title: 'Section A.1.2',
            itemPrice: 100_000,
            itemsCount: 14,
            totalSum: 100_000 * 14,
          },
        ],
      },
      {
        title: 'Group A.2',
        // level: 'secondary',
        rows: [
          {
            id: 'a21',
            title: 'Section A.2.1',
            itemPrice: 30_000,
            itemsCount: 8,
            totalSum: 30_000 * 8,
          },
          {
            id: 'a22',
            title: 'Section A.2.2',
            itemPrice: 800_000,
            itemsCount: 3,
            totalSum: 800_000 * 3,
          },
        ],
      },
    ],
  },
  {
    title: 'Workspace B',
    // level: 'main',
    rows: [
      {
        id: 'b21',
        title: 'Section B.2.1',
        itemPrice: 30_000,
        itemsCount: 8,
        totalSum: 30_000 * 8,
      },
      {
        id: 'b22',
        title: 'Section B.2.2',
        itemPrice: 800_000,
        itemsCount: 3,
        totalSum: 800_000 * 3,
      },
    ],
  },
];
