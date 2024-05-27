"use client";

import React from "react";
import * as PrimitiveToggleGroup from "@radix-ui/react-toggle-group";
import { twMerge } from "tailwind-merge";

interface ToggleProps
  extends React.PropsWithChildren,
    PrimitiveToggleGroup.ToggleGroupSingleProps {}

const Root: React.FC<ToggleProps> = ({
  children,
  className,
  defaultValue,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = React.useState(defaultValue);

  const handleValueChange = React.useCallback((value: string) => {
    if (value) setSelectedOption(value);
  }, []);

  return (
    <PrimitiveToggleGroup.Root
      data-testid="toggle"
      className={twMerge(
        "inline-flex rounded items-center justify-around gap-2 p-1 border border-gray-300",
        className
      )}
      {...props}
      value={selectedOption}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
    >
      {children}
    </PrimitiveToggleGroup.Root>
  );
};

interface ToggleItemProps
  extends React.PropsWithChildren,
    PrimitiveToggleGroup.ToggleGroupItemProps {}

const Item: React.FC<ToggleItemProps> = ({ children, className, ...props }) => {
  return (
    <PrimitiveToggleGroup.Item
      className={twMerge(
        "text-sm text-green-950 p-1 px-3 rounded data-[state=on]:bg-green-700 data-[state=on]:text-white hover:bg-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveToggleGroup.Item>
  );
};

export const Toggle = { Root, Item };
