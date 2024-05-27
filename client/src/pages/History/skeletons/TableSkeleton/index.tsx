import React from "react";
import { twMerge } from "tailwind-merge";

const Content: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "bg-gray-300 rounded-sm animate-pulse py-2 w-fit",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const TableSkeleton = { Content };
