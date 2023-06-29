import { cloneElement, useState } from 'react';
import { IWithConfirmActionProps } from './WithConfirmAction.types';
import { DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import { Button } from '../Button';
import {
  StyledConfirmText,
  StyledWithConfirmAction,
} from './WithConfirmAction.styled';

export const WithConfirmAction = ({
  onConfirm,
  children,
  confirmText,
  abortText,
  actionButtonVariant,
  actionText,
}: IWithConfirmActionProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const childElement = cloneElement(children, {
    onClick: () => setIsConfirming((prev) => !prev),
  });
  return isConfirming
    ? cloneElement(childElement, {
        children: (
          <StyledWithConfirmAction>
            <StyledConfirmText>
              {confirmText ?? DISPLAY_TEXTS.he.buttons[EButtonTexts.AreYouSure]}
            </StyledConfirmText>
            <Button
              variant={actionButtonVariant ?? 'danger'}
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
                setIsConfirming(false);
              }}
            >
              {actionText ?? DISPLAY_TEXTS.he.buttons[EButtonTexts.Approve]}
            </Button>
            <Button
              variant='secondary'
              onClick={(e) => {
                e.stopPropagation();
                setIsConfirming(false);
              }}
            >
              {abortText ?? DISPLAY_TEXTS.he.buttons[EButtonTexts.Abort]}
            </Button>
          </StyledWithConfirmAction>
        ),
      })
    : childElement;
};
