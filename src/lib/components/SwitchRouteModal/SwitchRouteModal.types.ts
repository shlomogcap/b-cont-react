import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { IBlocksGridProps } from '../commons/BlocksGrid/BlocksGrid.types';

export type ISwitchRouteModalProps = {
  items: IBlocksGridProps['items'];
  segmentName?: string;
};

export type ISwitchRouteModalData = ISwitchRouteModalProps & {
  name: EModalName.SwitchRoute;
};
