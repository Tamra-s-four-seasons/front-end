"use client";

import React from "react";
import { NavRoot, NavList, NavItem, NavLink } from "@vapor-ui/core";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <NavRoot size="md" shape="fill" aria-label="Main Navigation">
      <NavList className="w-full gap-0 bg-[#F6F6F6] rounded-full h-12">
        <NavItem className="flex-1 rounded-full self-center h-full">
          <NavLink
            href="/"
            selected={pathname === "/"}
            className={cn(
              "rounded-full leading-5 text-[#707070] font-semibold h-full bg-transparent",
              pathname === "/" && "bg-[#cfcfcf] text-foreground"
            )}
          >
            진행중인 지도
          </NavLink>
        </NavItem>
        <NavItem className="flex-1 rounded-full self-center h-full">
          <NavLink
            href="/collection"
            selected={pathname === "/collection"}
            className={cn(
              "rounded-full leading-5 text-[#707070] font-semibold h-full bg-transparent",
              pathname === "/collection" && "bg-[#cfcfcf] text-foreground"
            )}
          >
            완료된 지도
          </NavLink>
        </NavItem>
      </NavList>
    </NavRoot>
  );
};

export default Navigation;
