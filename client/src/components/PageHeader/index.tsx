import React from "react";
import { twMerge } from "tailwind-merge";

const Root: React.FC<React.ComponentProps<"h1">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <header
      className={twMerge(
        "flex mb-10 justify-between items-center gap-5 md:flex-row md:w-full md:text-left flex-col text-center",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
};

const Title: React.FC<React.ComponentProps<"h1">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1
      className={twMerge("text-3xl font-bold text-green-950", className)}
      {...props}
    >
      {children}
    </h1>
  );
};

const Subtitle: React.FC<React.ComponentProps<"h3">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3 className={twMerge("text-gray-500 pt-1", className)} {...props}>
      {children}
    </h3>
  );
};

export const PageHeader = { Root, Title, Subtitle };
