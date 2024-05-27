import React from "react";
import { twMerge } from "tailwind-merge";

export const Button: React.FC<React.ComponentProps<"button">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "bg-green-700 text-white py-3 px-6 rounded hover:bg-green-700/90 transition-all ease-in-out font-semibold text-sm flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
