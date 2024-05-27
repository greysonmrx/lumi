"use client";

import React from "react";
import * as PhosphorIcons from "phosphor-react";

type IconName =
  | "dashboard"
  | "history"
  | "lightning"
  | "plug"
  | "leaf"
  | "wallet"
  | "trend-up"
  | "trend-down"
  | "scales"
  | "search"
  | "invoice"
  | "upload";

interface IconProps extends PhosphorIcons.IconProps {
  name: IconName;
  size: number;
}

const iconList: Record<IconName, React.FC<Pick<IconProps, "size">>> = {
  dashboard: (props) => (
    <PhosphorIcons.SquaresFour
      aria-label="dashboard"
      weight="regular"
      {...props}
    />
  ),
  history: (props) => (
    <PhosphorIcons.ClockCounterClockwise
      aria-label="history"
      weight="regular"
      {...props}
    />
  ),
  lightning: (props) => (
    <PhosphorIcons.Lightning aria-label="lightning" weight="fill" {...props} />
  ),
  plug: (props) => (
    <PhosphorIcons.Plug aria-label="plug" weight="fill" {...props} />
  ),
  leaf: (props) => (
    <PhosphorIcons.Leaf aria-label="leaf" weight="fill" {...props} />
  ),
  wallet: (props) => (
    <PhosphorIcons.Wallet aria-label="wallet" weight="fill" {...props} />
  ),
  "trend-up": (props) => (
    <PhosphorIcons.TrendUp aria-label="trend-up" weight="bold" {...props} />
  ),
  "trend-down": (props) => (
    <PhosphorIcons.TrendDown aria-label="trend-down" weight="bold" {...props} />
  ),
  scales: (props) => (
    <PhosphorIcons.Scales aria-label="scales" weight="bold" {...props} />
  ),
  search: (props) => (
    <PhosphorIcons.MagnifyingGlass
      aria-label="search"
      weight="bold"
      {...props}
    />
  ),
  invoice: (props) => (
    <PhosphorIcons.FileText aria-label="invoice" weight="bold" {...props} />
  ),
  upload: (props) => (
    <PhosphorIcons.UploadSimple aria-label="upload" weight="bold" {...props} />
  ),
};

export const Icon: React.FC<IconProps> = ({ name, size, ...props }) => {
  return iconList[name]({ size, ...props });
};
