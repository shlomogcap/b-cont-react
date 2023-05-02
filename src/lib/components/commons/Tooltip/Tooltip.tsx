import React, { useRef, useState, useEffect } from 'react';
import { createPopper, Instance } from '@popperjs/core';
import { TooltipProps } from './Tooltip.types';
import { StyledTooltip } from './Tooltip.styled';

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);
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
    if (referenceElement.current && popperElement.current) {
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
    <div
      ref={referenceElement}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledTooltip
        ref={popperElement}
        role='tooltip'
        style={{ display: tooltipIsOpen ? 'block' : 'none' }}
      >
        <p className='content'>{content}</p>
      </StyledTooltip>
      {children}
    </div>
  );
};
