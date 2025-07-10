import React from "react";

import { UserOutlineIcon } from "@vapor-ui/icons";
import Navigation from "@/components/home/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-5 pt-[50.45px]">
      <div className="flex items-center justify-between">
        <div className="bg-gray-200 h-[44.1px] w-[116.99px]" />
        <UserOutlineIcon size={35} />
      </div>
      <div className="h-[22.29px]" />
      <h1 className="text-foreground text-[26px] leading-12 font-bold h-12">
        구름님의 OOO
      </h1>
      <div className="h-[21.16px]" />
      <Navigation />
      {children}
    </main>
  );
};

export default MainLayout;
