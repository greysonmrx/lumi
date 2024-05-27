import "@/assets/css/globals.css";

import React from "react";

import { Sidebar } from "./components/Sidebar";

export const DefaultLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Sidebar />
      <main className="md:p-10 p-6 pt-10 h-screen w-screen overflow-auto">
        {children}
      </main>
    </>
  );
};
