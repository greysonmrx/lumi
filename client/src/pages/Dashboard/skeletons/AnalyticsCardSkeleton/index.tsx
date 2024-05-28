import React from "react";
import { twMerge } from "tailwind-merge";

const Root: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 bg-gray-100 rounded-sm relative animate-pulse",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Header: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge("flex px-4 items-center gap-3 pt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Icon: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge("flex rounded-full bg-gray-300 p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Title: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "text-base font-medium rounded-sm bg-gray-300 py-2 px-14",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Content: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "flex items-end justify-between px-4 pl-5 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Value: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge("bg-gray-300 py-4 px-14 rounded-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Footer: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center gap-2 px-4 border-t-2 py-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const ComparisonValue: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge("bg-gray-300 py-2 px-20 rounded-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Button: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge("bg-gray-300 py-7 w-full rounded-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const AnalyticsCardSkeleton = {
  Root,
  Header,
  Icon,
  Title,
  Content,
  Value,
  Footer,
  ComparisonValue,
  Button,
};
