"use client";

import React from "react";
import Image from "next/image";

import LumiLogo from "@/assets/images/lumi.png";

import { Icon } from "@/components/Icon";
import { Tooltip } from "@/components/Tooltip";

import { useSidebar } from "./useSidebar";

export const Sidebar: React.FC = () => {
  const { handleCheckPathname } = useSidebar();

  return (
    <aside className="bg-green-950 h-screen w-16 flex flex-col items-center p-3 py-8">
      <Image src={LumiLogo} alt="Lumi" width={24} height={24} />
      <nav className="mt-10 flex flex-1 flex-col w-full gap-2">
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger>
            <a
              href="/"
              data-active={handleCheckPathname("/")}
              className="flex items-center justify-center text-xs text-white cursor-pointer hover:bg-green-900 w-full aspect-square rounded-md data-[active=true]:bg-green-900"
            >
              <Icon size={26} name="dashboard" />
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right" sideOffset={15}>
            <span>Painel de controle</span>
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger>
            <a
              href="/history"
              data-active={handleCheckPathname("/history")}
              className="flex items-center justify-center text-xs text-white cursor-pointer hover:bg-green-900 w-full aspect-square rounded-md data-[active=true]:bg-green-900"
            >
              <Icon size={26} name="history" />
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right" sideOffset={15}>
            <span>Histórico de faturas</span>
          </Tooltip.Content>
        </Tooltip.Root>
      </nav>
    </aside>
  );
};
