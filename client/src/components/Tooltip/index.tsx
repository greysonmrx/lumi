"use client";

import React from "react";
import * as PrimitiveTooltip from "@radix-ui/react-tooltip";

const Trigger: React.FC<PrimitiveTooltip.TooltipTriggerProps> = ({
  children,
  ...props
}) => {
  return (
    <PrimitiveTooltip.Trigger {...props} asChild data-testid="tooltip-trigger">
      {children}
    </PrimitiveTooltip.Trigger>
  );
};

const Content: React.FC<PrimitiveTooltip.TooltipContentProps> = ({
  children,
  ...props
}) => {
  return (
    <PrimitiveTooltip.Portal>
      <PrimitiveTooltip.Content
        {...props}
        asChild
        data-testid="tooltip-content"
      >
        <div className="bg-green-950 rounded-md px-4 py-3 text-center text-white font-medium text-sm">
          {children}
          <PrimitiveTooltip.Arrow className="fill-green-950" />
        </div>
      </PrimitiveTooltip.Content>
    </PrimitiveTooltip.Portal>
  );
};

const Root: React.FC<
  PrimitiveTooltip.TooltipProviderProps & PrimitiveTooltip.TooltipProps
> = ({
  children,
  delayDuration,
  skipDelayDuration,
  disableHoverableContent,
  ...props
}) => {
  return (
    <PrimitiveTooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <PrimitiveTooltip.Root
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
        {...props}
      >
        {children}
      </PrimitiveTooltip.Root>
    </PrimitiveTooltip.Provider>
  );
};

export const Tooltip = { Root, Trigger, Content };
