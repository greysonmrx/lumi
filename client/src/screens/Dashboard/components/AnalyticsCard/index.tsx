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
        "flex flex-col gap-4 border-2 border-gray-200 rounded-sm relative",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Header: React.FC<React.ComponentProps<"header">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <header
      className={twMerge("flex px-4 items-center gap-3 pt-4", className)}
      {...props}
    >
      {children}
    </header>
  );
};

const Icon: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center rounded-full bg-green-100/75 p-2 text-green-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Title: React.FC<React.ComponentProps<"h4">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h4
      className={twMerge("text-base font-medium text-green-950", className)}
      {...props}
    >
      {children}
    </h4>
  );
};

const Content: React.FC<React.ComponentProps<"main">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main
      className={twMerge(
        "flex items-end justify-between px-4 pl-5 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};

const Value: React.FC<React.ComponentProps<"h3">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={twMerge(
        "text-3xl font-bold text-green-950 tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

const ValueIndicator: React.FC<React.ComponentProps<"sub">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <sub
      className={twMerge(
        "text-sm font-normal ml-1 text-green-950/70",
        className
      )}
      {...props}
    >
      {children}
    </sub>
  );
};

const Footer: React.FC<React.ComponentProps<"footer">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <footer
      className={twMerge(
        "flex items-center gap-2 px-4 border-t py-3",
        className
      )}
      {...props}
    >
      {children}
    </footer>
  );
};

const ComparisonValue: React.FC<
  React.ComponentProps<"div"> & { growing: boolean }
> = ({ growing, children, className, ...props }) => {
  return (
    <div
      data-up={growing}
      className={twMerge(
        "flex items-end gap-1 text-sm font-semibold data-[up=true]:text-green-600 data-[up=false]:text-red-600",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
const ComparisonText: React.FC<React.ComponentProps<"p">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={twMerge("text-xs text-gray-500", className)} {...props}>
      {children}
    </p>
  );
};

export const AnalyticsCard = {
  Root,
  Header,
  Icon,
  Title,
  Content,
  Value,
  ValueIndicator,
  Footer,
  ComparisonValue,
  ComparisonText,
};
