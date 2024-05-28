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
    <div className="sticky top-0 bg-green-950 h-16 flex items-center py-3 px-8 justify-between z-50">
      <Image src={LumiLogo} alt="Lumi" width={20} height={20} />
      <nav className="flex gap-2">
        <a
          href="/"
          data-active={handleCheckPathname("/")}
          className="flex items-center font-medium justify-center text-sm text-white/70 cursor-pointer px-3 hover:underline rounded-md data-[active=true]:font-medium data-[active=true]:text-white"
        >
          Painel
        </a>
        <a
          href="/history"
          data-active={handleCheckPathname("/history")}
          className="flex items-center font-medium justify-center text-sm text-white/70 cursor-pointer px-3 hover:underline rounded-md data-[active=true]:font-medium data-[active=true]:text-white"
        >
          Histórico
        </a>
      </nav>
    </div>
  );
};
