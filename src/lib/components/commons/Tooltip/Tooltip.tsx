import React, { useRef, useState, useEffect } from 'react';
import { createPopper, Instance } from '@popperjs/core';
import { ITooltipProps } from './Tooltip.types';
import {
  StyledTooltip,
  StyledTooltipArrow,
  StyledTooltipContent,
  StyledTooltipWrapper,
} from './Tooltip.styled';

export const Tooltip = ({
  content,
  disableTooltip,
  children,
}: ITooltipProps) => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const arrowElement = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);

  const handleMouseEnter = () => {
    if (!tooltipIsOpen) {
      setTooltipIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (tooltipIsOpen) {
      setTooltipIsOpen(false);
    }
  };

  const initPopper = () => {
    if (
      referenceElement.current &&
      popperElement.current &&
      arrowElement.current
    ) {
      popperInstance.current = createPopper(
        referenceElement.current,
        popperElement.current,
        {
          placement: 'top',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                padding: 8,
              },
            },
            {
              name: 'arrow',
              options: {
                padding: 8,
                element: arrowElement.current,
              },
            },
          ],
        },
      );
    }
  };

  const destroyPopper = () => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
      popperInstance.current = null;
    }
  };

  const updatePopper = () => {
    if (popperInstance.current) {
      popperInstance.current.update();
    }
  };

  useEffect(() => {
    initPopper();
    return () => destroyPopper();
  }, []);

  useEffect(() => {
    updatePopper();
  }, [tooltipIsOpen]);

  return (
    <StyledTooltipWrapper
      ref={referenceElement}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledTooltip
        ref={popperElement}
        role='tooltip'
        style={{
          display:
            tooltipIsOpen && !disableTooltip && Boolean(content)
              ? 'block'
              : 'none',
        }}
      >
        <StyledTooltipContent>{content}</StyledTooltipContent>
        <StyledTooltipArrow ref={arrowElement} />
      </StyledTooltip>
      {children}
    </StyledTooltipWrapper>
  );
};
