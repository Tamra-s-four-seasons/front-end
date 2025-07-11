"use client";

import { getAuthUser } from "@/lib/auth";
import React from "react";

const HomeHeading = () => {
  const user = getAuthUser();
  return (
    <h1 className="text-foreground text-[26px] leading-12 font-bold h-12">
      {user?.username}님의 지도
    </h1>
  );
};

export default HomeHeading;
