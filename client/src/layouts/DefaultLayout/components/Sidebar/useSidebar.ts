import { useCallback } from "react";
import { usePathname } from "next/navigation";

interface UseSidebarData {
  handleCheckPathname: (pathnameToCheck: string) => boolean;
}

export function useSidebar(): UseSidebarData {
  const pathname = usePathname();

  const handleCheckPathname = useCallback(
    (pathnameToCheck: string) => {
      return pathname === pathnameToCheck;
    },
    [pathname]
  );

  return {
    handleCheckPathname,
  };
}
