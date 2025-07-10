import React from "react";

import { PlusBoxIcon, UserOutlineIcon } from "@vapor-ui/icons";
import Navigation from "@/components/home/navigation";
import Link from "next/link";
import { Text } from "@vapor-ui/core";

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
      <Link
        href="/new"
        className="bg-primary h-[85px] flex justify-center items-center rounded-t-[50px] text-white gap-1.5 fixed bottom-0 w-full max-w-[450px] left-1/2 -translate-x-1/2 mx-auto"
      >
        <Text typography="heading4" className="font-semibold text-white">
          새 미션 등록하기
        </Text>
        <PlusBoxIcon size={23} color="white" />
      </Link>
    </main>
  );
};

export default MainLayout;
