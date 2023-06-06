import { BlocksGrid } from '../commons/BlocksGrid';
import { DISPLAY_TEXTS } from './SwitchRouteModal.consts';
import { StyledSwitchRouteModal } from './SwitchRouteModal.styled';
import { ISwitchRouteModalProps } from './SwitchRouteModal.types';

export const SwitchRouteModal = ({
  items,
  segmentName = '...',
}: ISwitchRouteModalProps) => {
  return (
    <StyledSwitchRouteModal title={DISPLAY_TEXTS.he.getModalTitle(segmentName)}>
      <BlocksGrid items={items} />
    </StyledSwitchRouteModal>
  );
};
