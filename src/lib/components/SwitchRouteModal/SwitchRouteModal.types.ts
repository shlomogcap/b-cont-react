import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { IBlocksGridProps } from '../commons/BlocksGrid/BlocksGrid.types';

export type TSwitchRouteModalProps = {
  items: IBlocksGridProps['items'];
  segmentName?: string;
};

export type TSwitchRouteModalData = ISwitchRouteModalProps & {
  name: EModalName.SwitchRoute;
};
