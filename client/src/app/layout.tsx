import React from "react";
import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import type { Metadata } from "next";

import { DefaultLayout } from "@/layouts/DefaultLayout";

const plusJakartaSans = PlusJakartaSans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumi - Teste para desenvolvedor full-stack",
  description: "Teste para desenvolvedor full-stack",
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#052E16" />
      </head>
      <body className={twMerge("", plusJakartaSans.className)}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
};

export default RootLayout;
