import React from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "../Icon";

export const SearchField: React.FC<React.ComponentProps<"input">> = ({
  className,
  ...props
}) => {
  return (
    <div className={twMerge("relative", className)}>
      <Icon
        name="search"
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        data-testid="search-field"
        className="w-full text-green-950 outline-none outline-1 outline-offset-0 border border-gray-300 p-2 pl-10 rounded text-sm active:border-green-700 focus:border-green-700 focus-visible:border-green-700 hover:border-green-700 active:outline-green-700 focus:outline-green-700 focus-visible:outline-green-700"
        {...props}
      />
    </div>
  );
};
